import mongoose from "mongoose";

const slotsSchema = new mongoose.Schema({  
    Session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
})

const Slot = mongoose.model('Slot', slotsSchema);
export default Slot;