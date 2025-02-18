import mongoose from 'mongoose';

const sessionsSchema = new mongoose.Schema({
    doctorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Session = mongoose.model('Sessions', sessionsSchema);
export default Session;
