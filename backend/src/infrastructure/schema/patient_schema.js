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
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    relation: {
        type: String,
        enum: ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'],
        required: true
    },
    familyId: {
        type: String,
        required: true
    }
});

const Patient = mongoose.model('patients', patientsSchema, 'patients');
export default Patient;