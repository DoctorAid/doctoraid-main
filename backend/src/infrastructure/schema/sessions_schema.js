import { Pin } from '@mui/icons-material';
import mongoose from 'mongoose';

const sessionsSchema = new mongoose.Schema({
    doctorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        populate: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    Pin: {
        type: String,
        required: true
    }
})

const Session = mongoose.model('Session', sessionsSchema);
export default Session;
