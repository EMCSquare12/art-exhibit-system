import {crypto} from 'crypto';
import Order from '../models/orderModel.js';
import Exhibit from '../models/exhibitModel.js';

const generateBookingId = () => {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
}

const createOrder = async (req, res) => {
    try {
        const { exhibitId, visitDate, timeSlot, quantity } = req.body;

        if(!exhibitId || !visitDate || !timeSlot || !totalPrice){
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(quantity < 1){
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }
        const exhibit = await Exhibit.findById(exhibitId);
        if (!exhibit) {
            return res.status(404).json({ message: 'Exhibit not found' });
        }
        if(!exhibit.isActive){
            return res.status(400).json({ message: 'Exhibit is not active for booking' });
        }

        const dateObj = new Date(visitDate);

        const existingOrders = await Order.findOne({
            exhibit: exhibitId,
            visitDate: dateObj,
            timeSlot: timeSlot,
            paymentSatus: { $in: ['paid', 'pending'] }
        });

        const currentBookSeats = existingOrders.reduce((total, order) => total + order.quantity, 0);

        if (currentBookSeats + quantity > exhibit.capacityPerSlot) {
            const remaining = exhibit.capacityPerSlot - currentBookedSeats;
            return res.status(400).json({ message: `Sorry, that slot is almost full. Only ${remaining} ticket(s) remaining.`,
            remainingSeats: remaining });
        }

        const totalPrice = exhibit.ticketPrice * Number(quantity);
        const bookingId = generateBookingId();



    const order = await Order.create({
      user: req.user._id, 
      exhibit: exhibitId,
      visitDate: dateObj,
      timeSlot,
      quantity: Number(quantity),
      totalPrice,
      bookingId,
      paymentStatus: 'paid', 
    });
    
    res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        .populate('exhibit', 'title imageUrl startDate endDate').
        sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const validateTicket = async (req, res) => {
    const { bookingId } = req.params;
    if(!bookingId){
        return res.status(400).json({ message: 'Booking ID is required' });
    }
    try {
        const order = await Order.findOne({ bookingId })
        .populate('user', 'name' ).populate('exhibit', 'title');
        if (!order) {
            return res.status(404).json({isValid: false, message: 'Invalid booking ID' });
        }
        if (order.scannedAt) {
            return res.status(400).json({
                isValid: false,
                message: `TICKET ALREADY USED. Scanned at ${new Date(order.scannedAt).toLocaleTimeString()}`,
                order
             });
        }
        order.scannedAt = new Date();
        await order.save();
        res.status(200).json({ message: 'Ticket validated successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createOrder, getMyOrders, validateTicket };