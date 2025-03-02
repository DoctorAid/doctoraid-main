import mongoose from 'mongoose';

const patientsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: [String],
        default: []
    },
    familyId: {
        type: String,
        default: ''
    }
});

const Patient = mongoose.model('Patient', patientsSchema);
export default Patient;

