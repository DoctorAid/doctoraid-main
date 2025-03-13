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
    // doctors: {
    //     type: [String],
    //     required: true
    // },
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
    // medicalHistory: {
    //     type: [String],
    //     default: []
    // },
    // familyId: {
    //     type: String,
    //     default: null
    // }
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
    },
    patientId: {
        type: String,
        required: true,
        unique: true
    }
});

const Patient = mongoose.model('Patient', patientsSchema, 'Patient');
export default Patient;