import mongoose from 'mongoose';

const doctorsSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: false,
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
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            required: true
        }
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
    ppLocation: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorsSchema);
export default Doctor;