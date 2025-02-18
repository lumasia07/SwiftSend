import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h1 className="text-5xl font-bold mb-4">Fast, Secure & Affordable Remittances</h1>
        <p className="text-lg mb-6 max-w-2xl">
          Send and receive money seamlessly across Africa and Latin America. 
          Experience low fees, fast transactions, and a hassle-free process.
        </p>
        <div className="flex space-x-4">
          <Link to="/send" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100">
            Send Money
          </Link>
          <Link to="/receive" className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow hover:bg-gray-800">
            Receive Money
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center bg-gray-400">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose SwiftSend?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Low Transfer Fees</h3>
            <p className="text-gray-600">Save more with our industry-lowest remittance costs.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Fast Transfers</h3>
            <p className="text-gray-600">Send money in minutes with our instant transfer network.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Global Access</h3>
            <p className="text-gray-600">We support over 50 countries across Africa and Latin America.</p>
          </div>
        </div>
      </section>

      {/* Global Coverage Map */}
      <section className="bg-blue-400 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">We’re Global</h2>
        <p className="text-lg text-gray-700 mb-6">Supporting transactions in 50+ countries.</p>
        <img src="/assets/world-map.png" alt="Global coverage map" className="mx-auto max-w-md" />
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-400">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-700 italic">"SwiftSend made it easy for me to send money home. It's fast and reliable!"</p>
            <h4 className="font-semibold mt-4">- Maria, Brazil</h4>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-700 italic">"The best remittance platform I’ve used. The rates are unbeatable!"</p>
            <h4 className="font-semibold mt-4">- James, Nigeria</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
