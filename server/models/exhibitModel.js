import mongoose from "mongoose";

const exhibitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    artist:{
        type: String,
        required: [true, 'Artist name is required'],
    },
    descroption: {
        type: String,
        required: [true, 'Description is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],  
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    capacityPerSlot: {
        type: Number,
        required: true,
        default: 50
    },
    timeSlots: [{
        type: String,
        required: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const Exhibit = mongoose.model('Exhibit', exhibitSchema);
export default Exhibit;