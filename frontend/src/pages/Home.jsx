import { Link } from 'react-router-dom';
import { ArrowRight, Send, Globe, Shield } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const Feature = ({ icon: Icon, title, description }) => (
  <div className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

// eslint-disable-next-line react/prop-types
const Testimonial = ({ quote, author, role }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex flex-col space-y-4">
      <div className="text-blue-600">&quot;</div>
      <p className="text-gray-700 leading-relaxed italic">{quote}</p>
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{author}</span>
        {role && <span className="text-gray-500 text-sm">{role}</span>}
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800" />
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Send Money Globally,<br />
              <span className="text-blue-200">Without Boundaries</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Experience lightning-fast transactions with near-zero fees.
              Built on Stellar network for secure, instant global transfers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                to="/send"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Send Money
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built on cutting-edge blockchain technology for secure, instant, and affordable global transfers.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={Send}
            title="Instant Transfers"
            description="Send money across borders in seconds, not days. Powered by Stellar's lightning-fast network."
          />
          <Feature
            icon={Shield}
            title="Bank-Grade Security"
            description="Your transactions are protected by military-grade encryption and blockchain technology."
          />
          <Feature
            icon={Globe}
            title="Global Coverage"
            description="Send money to over 50 countries worldwide with competitive exchange rates."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Countries Supported</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">$0.001</div>
              <div className="text-gray-600">Average Fee</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">5s</div>
              <div className="text-gray-600">Average Transfer Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Users Worldwide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust us for their global money transfers.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Testimonial
            quote="The fastest way to send money home. The fees are incredibly low and the service is reliable."
            author="Maria Rodriguez"
            role="Regular User, Brazil"
          />
          <Testimonial
            quote="I use this platform for my business payments. It's secure, fast, and the rates are unbeatable!"
            author="James Okonjo"
            role="Business Owner, Nigeria"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;