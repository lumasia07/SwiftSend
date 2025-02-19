const Transactions = () => {
    const transactions = [
      { id: "12345", amount: "$100", status: "Completed", date: "Feb 15, 2025" },
      { id: "67890", amount: "$50", status: "Pending", date: "Feb 16, 2025" },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Transaction ID</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="p-2">{tx.id}</td>
                  <td className="p-2">{tx.amount}</td>
                  <td className={`p-2 ${tx.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                    {tx.status}
                  </td>
                  <td className="p-2">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Transactions;
  