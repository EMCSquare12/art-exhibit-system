import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exhibit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exhibit',
        required: true
    },
    visitDate:{
        type: Date,
        required: true
    },
    timeSlot:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    paymentSatus:{
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentId:{
        type: String
    },
    bookingId:{
        type: String,
        required: true,
        unique: true
    },
    scannedAt:{
        type: Date
    }
},{
    timestamps: true
})
orderSchema.index({ user: 1, exhibit: 1, visitDate: 1, timeSlot: 1 }, { unique: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;