import mongoose from 'mongoose';

const familySchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        // unique: true
    },
    members: [{
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        relation: {
            type: String,
            enum: ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'],
            required: true
        }
    }],
    doctors: [{
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Family = mongoose.model('Family', familySchema);
export default Family;
