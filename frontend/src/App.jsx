import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SendMoney from "./pages/SendMoney";
import ReceiveMoney from "./pages/ReceiveMoney";
import Transactions from "./pages/Transactions";
import LoginForm from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/receive" element={<ReceiveMoney />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
