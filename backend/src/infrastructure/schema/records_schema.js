import mongoose from 'mongoose';

const recordsSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Record = mongoose.model('Record', recordsSchema);
export default Record;
