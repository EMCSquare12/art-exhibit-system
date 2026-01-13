import Order from '../models/orderModel.js';
import Exhibit from '../models/exhibitModel.js';

const getDashboardStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [
      activeExhibitsCount,
      revenueAgg,
      ticketsTodayAgg,
      recentBookings
    ] = await Promise.all([
      Exhibit.countDocuments({ isActive: true }),

      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]),

      Order.aggregate([
         { $match: {
             paymentStatus: 'paid',
             createdAt: { $gte: startOfDay, $lte: endOfDay }
         }},
         { $group: { _id: null, totalTickets: { $sum: '$quantity' } } }
      ]),

      Order.find({ paymentStatus: { $ne: 'failed' } })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name')
        .populate('exhibit', 'title')
    ]);

    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
    const ticketsSoldToday = ticketsTodayAgg.length > 0 ? ticketsTodayAgg[0].totalTickets : 0;

    res.status(200).json({
      stats: {
        ticketsSoldToday,
        activeExhibitsCount,
        totalRevenue
      },
      recentBookings
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ message: 'Failed to fetch dashboard statistics.' });
  }
};

export { getDashboardStats };