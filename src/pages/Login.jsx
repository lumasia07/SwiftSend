// import { useState } from "react";
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/"); // Redirect after login
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/");
//     } catch (err) {
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Login</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleLogin}>
//           <label className="block mb-2 text-gray-700">Email</label>
//           <input
//             type="email"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label className="block mb-2 text-gray-700">Password</label>
//           <input
//             type="password"
//             className="w-full p-2 border rounded mb-4"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//             Login
//           </button>
//         </form>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600"
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
