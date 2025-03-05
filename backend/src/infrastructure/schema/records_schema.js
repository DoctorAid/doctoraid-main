import mongoose from 'mongoose';

const recordsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    prescription: {
        type: [String], 
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

