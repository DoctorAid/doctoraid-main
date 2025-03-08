import mongoose from "mongoose";

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
        const { patientId, page = 1, limit = 10 } = req.query;
        
        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required' });
        }
        
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: 'Invalid patient ID format' });
        }
        
        const records = await Record.find({
            patientId: new mongoose.Types.ObjectId(patientId)
        })
        .sort({ date: -1 }) // Sort by date, most recent first
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit));
        
        // Get total count for pagination info
        const totalRecords = await Record.countDocuments({
            patientId: new mongoose.Types.ObjectId(patientId)
        });
        
        return res.status(200).json({
            records,
            pagination: {
                totalRecords,
                totalPages: Math.ceil(totalRecords / parseInt(limit)),
                currentPage: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching patient records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRecordsByPatientandDoctor = async (req, res) => {
    try {
        const { patientId, doctorId, page = 1, limit = 10 } = req.query;
       
        if (!patientId || !doctorId) {
            return res.status(400).json({ message: 'Patient ID and Doctor ID are required' });
        }
       
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: 'Invalid patient or doctor ID format' });
        }
       
        const records = await Record.find({
            patientId: new mongoose.Types.ObjectId(patientId),
            doctorId: new mongoose.Types.ObjectId(doctorId)
        })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit));
           
        return res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRecordById = async (req, res) => {
    try {
        const { id } = req.query;
        
        // Validate record ID format
        if (!id) {
            return res.status(400).json({ message: 'Record ID is required' });
        }
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid record ID format' });
        }
        
        // Find the record by ID (explicit conversion)
        const record = await Record.findOne({ _id: new mongoose.Types.ObjectId(id) });
        
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        
        // // Validate patient and doctor IDs
        // if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
        //     return res.status(400).json({ message: 'Invalid patient or doctor ID format' });
        // }
        
        // // Check if the record belongs to the specified patient and doctor
        // if (record.patientId.toString() !== patientId || record.doctorId.toString() !== doctorId) {
        //     return res.status(403).json({ message: 'Record not found for this patient or doctor' });
        // }
        
        return res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { prescription, observation, notes, date } = req.body;
        
        // Find the record first to check if it exists
        const record = await Record.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        
        // Create an object with only the fields that should be updated
        const updateData = {};
        
        if (prescription !== undefined) updateData.prescription = prescription;
        if (observation !== undefined) updateData.observation = observation;
        if (notes !== undefined) updateData.notes = notes;
        if (date !== undefined) updateData.date = date;
        
        // We don't allow updating patientId or doctorId for data integrity
        
        // Set the updatedAt timestamp
        updateData.updatedAt = new Date();
        
        // Update the record and return the updated document
        const updatedRecord = await Record.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        return res.status(200).json(updatedRecord);
    } catch (error) {
        console.error('Error updating record:', error);
        
        // Provide more specific error messages for common issues
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid record ID format' });
        }
        
        res.status(500).json({ message: 'Internal server error' });
    }
};