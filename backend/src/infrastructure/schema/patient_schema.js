import mongoose from 'mongoose';

const patientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    familyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',
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
    age: {
        type: Number,
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
    bloodGroup: {
        type: String,
        required: true
    },
    allergies: {
        type: [String],
        required: true
    },
    relation: {
        type: String,
        enum: ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'],
        required: true
    }
});

const Patient = mongoose.model('patients', patientsSchema, 'patients');
export default Patient;