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
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available',
        required: true
    },
    patientNote: {
        type: String,
        default: null
    },
    familyId: {
        type: String,
        default: null
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        default: null
    },
    patientName: {
        type: String,
        default: null
    },
    recordId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Record',
        default: null
    }
});

const Slot = mongoose.model('Slot', slotsSchema);
export default Slot;