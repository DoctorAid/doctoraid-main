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
    certification: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    schedule: {
        weekdays: {
            type: String,
            required: true
        },
        weekends: {
            type: String,
            required: true
        }
    },
   location: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorsSchema);
export default Doctor;