import mongoose from 'mongoose';

const doctorsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    certification: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorsSchema);
export default Doctor;
