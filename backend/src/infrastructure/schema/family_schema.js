import mongoose from 'mongoose';

const familySchema = new mongoose.Schema({
    
    // userId: {
    //     type: String, // Changed to String to store Clerk userId directly
    //     required: true,
    //     unique: true // Each user can only have one family
    // },
    familyId: {
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Family = mongoose.model('Family', familySchema);
export default Family;