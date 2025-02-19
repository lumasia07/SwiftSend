import { useState } from 'react';

const SendMoney = () => {
  const [formData, setFormData] = useState({
    receiverPublic: '',
    amount: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: null });

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch('https://69d1-154-159-237-210.ngrok-free.app/send-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Transaction failed');
      }

      setStatus({
        loading: false,
        error: '',
        success: {
          hash: data.hash,
          ledger: data.ledger
        }
      });

      // Reset form after successful transaction
      setFormData({
        receiverPublic: '',
        amount: ''
      });

    } catch (err) {
      setStatus({
        loading: false,
        error: err.message,
        success: null
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="receiverPublic" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Recipient&apos;s Public Key
            </label>
            <input
              type="text"
              id="receiverPublic"
              name="receiverPublic"
              value={formData.receiverPublic}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="G..."
              required
            />
          </div>

          <div>
            <label 
              htmlFor="amount" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (XLM)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.0"
              step="0.0000001"
              min="0.0000001"
              required
            />
          </div>

          {status.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {status.error}
            </div>
          )}

          {status.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
              <p className="font-medium">Transaction Successful!</p>
              <p className="text-sm mt-1">Transaction Hash: {status.success.hash}</p>
              <p className="text-sm">Ledger: {status.success.ledger}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.loading ? 'Sending...' : 'Send Payment'}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p className="mb-2">Note:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Make sure the recipient&apos;s public key is correct</li>
            <li>The minimum amount is 0.0000001 XLM</li>
            <li>Transaction fees will be deducted from your balance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;