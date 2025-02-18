const SendMoney = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Send Money</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <label className="block mb-2 text-gray-700">Recipient</label>
          <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter recipient's email or phone" />
          
          <label className="block mb-2 text-gray-700">Amount</label>
          <input type="number" className="w-full p-2 border rounded mb-4" placeholder="Enter amount" />
  
          <label className="block mb-2 text-gray-700">Currency</label>
          <select className="w-full p-2 border rounded mb-4">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KES">KES</option>
            <option value="NGN">NGN</option>
          </select>
  
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Money
          </button>
        </div>
      </div>
    );
  };
  
  export default SendMoney;
  