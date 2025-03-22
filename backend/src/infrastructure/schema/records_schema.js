import mongoose from 'mongoose';

const recordsSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
      familyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    prescription: {
        type: [String], 
        required: true
    },
    observation: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const Record = mongoose.model('Record', recordsSchema);
export default Record;

