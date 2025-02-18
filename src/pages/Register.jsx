// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       setError("Registration failed");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Register</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleRegister}>
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

//           <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
