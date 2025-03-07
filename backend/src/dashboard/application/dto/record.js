import Record from "../../../infrastructure/schema/records_schema.js";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";

export const createRecord = async (req, res) => {
    try {
        const { prescription, patientId, doctorId, observation, notes, date } = req.body;
        
        if (!prescription || !patientId || !doctorId || !observation || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        // Verify the patient exists
        const patientExists = await Patient.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        
        // Verify the doctor exists
        const doctorExists = await Doctor.findById(doctorId);
        if (!doctorExists) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        const newRecord = new Record({
            patientId,
            doctorId,
            prescription,
            observation,
            notes,
            date
        });
        
        const savedRecord = await newRecord.save();
        return res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRecordsByPatient = async (req, res) => {
    try {
        const { patientId, doctorId, page = 1, limit = 10 } = req.query;
        if (!patientId || !doctorId) {
            return res.status(400).json({ message: 'Patient ID and Doctor ID are required' });
        }

        const records = await Record.find({ patient: patientId, doctor: doctorId })
            .populate('patient')
            .populate('doctor')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        return res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        const { patientId, doctorId } = req.query;
        
        // First find the record by ID
        const record = await Record.findOne({ _id: id });
        
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        
        // Check if the record belongs to the specified patient and doctor
        if (record.patientId.toString() !== patientId || record.doctorId.toString() !== doctorId) {
            return res.status(403).json({ message: 'Record not found for this patient or doctor' });
        }
        
        return res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedRecord = await Record.findOneAndUpdate({ recordId: id }, updateData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json(updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
