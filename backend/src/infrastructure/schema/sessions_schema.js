import mongoose from 'mongoose';

const sessionsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    }
})

const Session = mongoose.model('Sessions', sessionsSchema);
export default Session;
