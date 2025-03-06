import mongoose from 'mongoose';

const doctorsSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        unique: true
    },
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
            required: false
        },
        weekends: {
            type: String,
            required: false
        }
    },
   location: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorsSchema);
export default Doctor;