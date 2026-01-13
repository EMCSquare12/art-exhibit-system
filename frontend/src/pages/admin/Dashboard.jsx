import { FaTicketAlt, FaImages, FaDollarSign, FaCalendarCheck } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { title: "Tickets Sold Today", value: "12", icon: <FaTicketAlt />, color: "bg-blue-500" },
    { title: "Active Exhibits", value: "3", icon: <FaImages />, color: "bg-green-500" },
    { title: "Total Revenue", value: "$1,250", icon: <FaDollarSign />, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCalendarCheck className="text-gray-500"/> System Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center">
            <div className={`p-4 rounded-full text-white mr-4 ${stat.color} shadow-lg`}>
                {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm font-mono text-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 font-bold text-gray-700 flex justify-between items-center">
            <span>Recent Transactions (Placeholder Data)</span>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium tracking-wider text-left">
            <tr>
              <th className="px-6 py-3">Booking ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Exhibit</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {[1, 2, 3].map(i => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-bold text-blue-600">A1B2C3D{i}</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4 text-gray-600">Modern Impressions</td>
                  <td className="px-6 py-4 text-right font-medium">$50.00</td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;