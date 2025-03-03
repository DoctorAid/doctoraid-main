import mongoose from "mongoose";
import patient from "../../../infrastructure/schema/patient_schema.js";
import record from "../../../infrastructure/schema/records_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";

//search patient by name or email
export const searchPatients = async (req, res)  => {
    try {
        const { name, email } =req.query;

        if(!name && !email) {
            return res.status(400).json({message: "Please provide a name or email to search. "});
        }

        const query = {};
        if (name) query.name = { $regex: new RegExp(name, "i")};    //case insensitive search
        if (email) query.email = { $regex: new RegExp(email, "i") };

        const patients = await patient.find(query);
        return res.status(200).json(patients);

    }catch (error) {
        console.error("error searching patients: ", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

//getting the patient list
export const getPatientList = async(req, res) => {
    try {
        // Use 'let' instead of 'const' so we can reassign values
        let {page = 1, limit = 10} = req.query;

        // Convert to numbers
        page = Number(page);
        limit = Number(limit);

        if(isNaN(page) || isNaN(limit) || page < 1 || limit < 1){
            return res.status(400).json({ message: "Invalid page or limit values. Page and limit must be positive numbers"});
        }

        const patients = await patient.find()
            .skip((page - 1) * limit)  // Fixed parentheses issue
            .limit(limit)
            .lean();

        const totalPatients = await patient.countDocuments();

        return res.status(200).json({ totalPatients, patients});
    } catch (error) {
        console.error("Error fetching patient list: ", error);
        res.status(500).json({ message: "Internal server error", error: error.message});
    }
};

//sorting the patient list
export const sortPatientList = async (req, res) => {
    try {
        let { page = 1, limit = 10, doctorId, sortMethod = "asc" } = req.query;

        //converting page and limit to numbers
        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || isNaN(limit) || page<1 || limit <1) {
            return res.status(400).json({ message: "Invalid page or limit values. page and limit must be positive numbers" });

        }

        //validate doctor id
        if (doctorId && !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctorId. it has to be a valid Id"});
        }

        //validating the sorting method
        const order = sortMethod === "desc" ? -1 : 1;

        //query to filter by doctors Id if provided
        const query = doctorId ? { doctorId } : {};

        //getting the patients with sorting and pagination
        const patients = await patient.find(query).lean()
            .sort({ name: order })  //sort by name (asc / des)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPatients = await patient.countDocuments(query);

        return res.status(200).json({ totalPatients, patients});
    } catch (error) {
        console.error("Error fetching sorted patient list: ", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//getting patient profile using patient Id
export const getPatientProfile = async (req, res) => {
    try {
        const { patientId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: "Invalid patient Id."});
        }
        const patientData = await patient.findById(patientId)
            .populate('medicalHistory')
            .populate('doctors')
            .lean();

        if(!patientData) {
            return res.status(404).json({ message: 'Patient not found'});
        }

        return res.status(200).json(patientData);
    }catch (error) {
        console.error('Error fetching patient profile: ', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

//getting medical records by patient id
export const getMedicalRecords = async (req,res) => {
    try {
        const {patientId} = req.params;
        let {page = 1, limit = 10 } = req.query;

        if( !mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: "Invalid patient ID. Please provide a valid Id"});
        }

        //converting to  numbers
        page = Number(page);
        limit = Number(limit);

        if(isNaN(page) || isNaN(limit) || page <1 || limit <1){
            return res.status(400).json({message: "Invalid page or limit values. page and limit must be positive numbers"});
        }

        const medicalRecords = await record.find({ patientId })
            .populate('doctorId', 'firstName lastName specialization')    //populating doctor details
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        
        const totalRecords = await record.countDocuments({ patientId});

        if(!medicalRecords.length) {
            return res.status(404).json({ message: "No medical records found for this patient."});
        }

        return res.status(200).json(medicalRecords);
    } catch (error) {
        console.error("Error fetching medical records: ", error);
        res.status(500).json({ message: "Internal server error ", error: error.message});
    }
};