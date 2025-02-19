const ReceiveMoney = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Receive Money</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <label className="block mb-2 text-gray-700">Enter Transaction ID</label>
          <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Transaction ID" />
  
          <label className="block mb-2 text-gray-700">Choose Payout Option</label>
          <select className="w-full p-2 border rounded mb-4">
            <option value="bank">Bank Transfer</option>
            <option value="mobile">Mobile Money</option>
            <option value="cash">Cash Pickup</option>
          </select>
  
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Receive Money
          </button>
        </div>
      </div>
    );
  };
  
  export default ReceiveMoney;
  