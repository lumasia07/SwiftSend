import sqlite3
import requests
from datetime import timedelta
from flask import Flask, request, jsonify
from stellar_sdk import Server, Keypair, TransactionBuilder, Network, Asset
import bcrypt
from cryptography.fernet import Fernet
from cryptography.fernet import InvalidToken  # Add this import
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from flask_cors import CORS



# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration
app.config["JWT_SECRET_KEY"] = "265b869d2bcf7fd03f8dde69c134cd5623c68a1f98c9524c8c17d4106b24429a"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)  # Token expires in 1 hour  # Change this in production!
HORIZON_URL = "https://horizon-testnet.stellar.org"
jwt = JWTManager(app)

# Initialize database and encryption
conn = sqlite3.connect('wallets.db', check_same_thread=False)
c = conn.cursor()
FERNET_KEY = b'k0gFRBzA-2cqy5X5Mh5Q1u3wE31ZJ9K7ktHsKd6LzWg='
cipher_suite = Fernet(FERNET_KEY)
# Create tables
c.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY,
              username TEXT UNIQUE,
              password_hash TEXT,
              public_key TEXT,
              encrypted_secret TEXT)''')
conn.commit()

# Initialize Stellar server
server = Server(horizon_url=HORIZON_URL)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    try:
        # Generate Stellar account
        keypair = Keypair.random()
        
        # Encrypt secret key
        encrypted_secret = cipher_suite.encrypt(keypair.secret.encode())

        # Hash password
        password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

        # Store in database
        c.execute('''INSERT INTO users 
                     (username, password_hash, public_key, encrypted_secret)
                     VALUES (?, ?, ?, ?)''',
                     (username, password_hash, keypair.public_key, encrypted_secret))
        conn.commit()

        # Fund testnet account
        response = requests.get(f"https://friendbot.stellar.org?addr={keypair.public_key}")
        response.raise_for_status()

        return jsonify({
            "message": "Account created",
            "public_key": keypair.public_key
        }), 201

    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 409
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Friendbot funding failed: {str(e)}"}), 500
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400

    user = c.execute('''SELECT * FROM users 
                       WHERE username = ?''', (username,)).fetchone()

    if user and bcrypt.checkpw(password.encode(), user[2]):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/send-payment", methods=["POST"])
@jwt_required()
def send_payment():
    username = get_jwt_identity()
    data = request.get_json()

    try:
        # Get user's encrypted secret and public key
        user = c.execute('''SELECT public_key, encrypted_secret 
                          FROM users WHERE username = ?''', 
                        (username,)).fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        receiver_public = data.get("receiverPublic")
        amount = data.get("amount")

        # Validate parameters
        if not receiver_public or not amount:
            return jsonify({"error": "Missing receiverPublic or amount"}), 400

        try:
            # Convert encrypted secret to bytes if stored as string
            encrypted_secret = user[1]
            if isinstance(encrypted_secret, str):
                encrypted_secret = encrypted_secret.encode()

            # Step 1: Decrypt secret
            decrypted_secret = cipher_suite.decrypt(encrypted_secret).decode()
        except InvalidToken:
            return jsonify({"error": "Decryption failed - invalid key"}), 500
        except Exception as e:
            return jsonify({"error": "Decryption error", "details": str(e)}), 500

        # Step 2: Create keypair
        try:
            sender_keypair = Keypair.from_secret(decrypted_secret)
        except Exception as e:
            return jsonify({"error": "Invalid secret key", "details": str(e)}), 500

        # Step 3: Load account
        try:
            sender_account = server.load_account(user[0])
        except Exception as e:
            return jsonify({
                "error": "Account loading failed",
                "details": f"Verify account {user[0]} exists and is funded. Error: {str(e)}"
            }), 400

        # Step 4: Validate receiver
        try:
            server.accounts().account_id(receiver_public).call()
        except Exception as e:
            return jsonify({
                "error": "Invalid receiver account",
                "details": f"Account {receiver_public} not found. Create it first."
            }), 400

        # Step 5: Build transaction
        try:
            transaction = (
                TransactionBuilder(
                    source_account=sender_account,
                    network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
                    base_fee=100,
                )
                .add_text_memo("Stellar Payment")
                .append_payment_op(
                    destination=receiver_public,
                    asset=Asset.native(),
                    amount=str(amount)
                )
                .set_timeout(30)
                .build()
            )
            transaction.sign(sender_keypair)
        except Exception as e:
            return jsonify({"error": "Transaction build failed", "details": str(e)}), 500

        # Step 6: Submit transaction
        try:
            response = server.submit_transaction(transaction)
            return jsonify({
                "success": True,
                "hash": response["hash"],
                "ledger": response["ledger"],
                "result": response["result_xdr"]
            })
        except Exception as e:
            return jsonify({
                "error": "Transaction submission failed",
                "details": str(e),
                "xdr": e.response.json()["extras"]["result_xdr"] if hasattr(e, "response") else None
            }), 500

    except Exception as e:
        return jsonify({
            "error": "Unexpected error",
            "details": str(e)
        }), 500

# Add this temporary route
@app.route("/debug-users", methods=["GET"])
def debug_users():
    users = c.execute("SELECT username, public_key, id FROM users").fetchall()
    return jsonify([dict(zip(['username', 'public_key'], user)) for user in users])


@app.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    username = get_jwt_identity()
    
    try:
        # Get user details from database
        user = c.execute('''SELECT username, public_key 
                           FROM users WHERE username = ?''', 
                        (username,)).fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Get account details and balance from Stellar network
        account = server.accounts().account_id(user[1]).call()
        
        # Find XLM balance
        xlm_balance = "0"
        for balance in account['balances']:
            if balance['asset_type'] == 'native':
                xlm_balance = balance['balance']
                break

        return jsonify({
            "username": user[0],
            "public_key": user[1],
            "xlm_balance": xlm_balance,
            "last_modified": account['last_modified_time']
        }), 200

    except Exception as e:
        return jsonify({
            "error": "Failed to fetch profile",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)