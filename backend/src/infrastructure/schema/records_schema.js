import mongoose from 'mongoose';

const recordsSchema = new mongoose.Schema({
    prescription: {
        type: [String], // ✅ Now supports an array of strings
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: true
    },
    
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Record = mongoose.model('Record', recordsSchema);
export default Record;

