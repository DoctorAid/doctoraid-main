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
        default: ''
    },
    familyId: {
        type: String,
        default: ''
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        default: ''
    },
    patientName: {
        type: String,
        default: ''
    },
    recordId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Record',
        default: ''
    }
});

const Slot = mongoose.model('Slot', slotsSchema);
export default Slot;