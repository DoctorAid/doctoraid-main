import mongoose from "mongoose";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Record from "../../../infrastructure/schema/records_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";


//creating a new patient

export const createPatients = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            dateOfBirth, 
            gender, 
            doctors, 
            contactNumber, 
            email, 
            address, 
            medicalHistory, 
            familyId
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth || !gender || !doctors || !contactNumber || !email || !address || !familyId) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Validate gender
        const validGenders = ['Male', 'Female', 'Other'];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value." });
        }

        // Validate doctors field (ensure it's an array and has at least one doctor)
        if (!Array.isArray(doctors) || doctors.length === 0) {
            return res.status(400).json({ message: "Doctors must be an array and should contain at least one doctor." });
        }

        // Validate dateOfBirth format (ensure it's a valid date)
        const dob = new Date(dateOfBirth);
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ message: "Invalid date of birth format." });
        }

        // Validate medicalHistory (ensure it's an array)
        if (medicalHistory && !Array.isArray(medicalHistory)) {
            return res.status(400).json({ message: "Medical history must be an array." });
        }

        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
        if (existingPatient) {
            return res.status(400).json({ message: "A patient with this email already exists." });
        }

        // Create new patient
        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth: dob,
            gender,
            doctors,
            contactNumber,
            email: email.toLowerCase(),
            address,
            medicalHistory: medicalHistory || [],
            familyId
        });

        // Save patient
        const savedPatient = await newPatient.save();
        console.log(savedPatient)

        // Return success response
        return res.status(201).json({
            message: "Patient created successfully",
            patient: savedPatient
        });

    } catch (error) {
        console.error('Error creating patient:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
};

//search patient by first name, last name  or email
export const searchPatients = async (req, res)  => {
    try {
        const { firstName,lastName, email } =req.query;

        if(!firstName && !lastName && !email) {
            return res.status(400).json({message: "Please provide a first name, last name  or email to search. "});
        }

        const query = {};
        if (firstName) query.firstName = { $regex: new RegExp(firstName, "i")};    //case insensitive search
        if (lastName) query.lastName = { $regex: new RegExp(lastName, "i")}; 
        if (email) query.email = { $regex: new RegExp(email, "i") };

        const patients = await Patient.find(query);

        if(!patients.length) {
            return res.status(404).json({ message: "No patients found."});
        }
        return res.status(200).json(patients);

    }catch (error) {
        console.error("error searching patients: ", error.message);
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

        const patients = await Patient.find()
            .skip((page - 1) * limit)  // Fixed parentheses issue
            .limit(limit)
            .lean();

        const totalPatients = await Patient.countDocuments();

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
            return res.status(400).json({ message: "Invalid page or limit values. Page and limit must be positive numbers" });

        }

        //validate doctor Id
        if (doctorId && !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctorId. Please provide a valid Id"});
        }

        //logging the sort method
        console.log("Sort method: ", sortMethod);

        //validating the sorting method
        const order = sortMethod === "desc" ? -1 : 1;

        //query to filter by doctors Id if provided
        const query = doctorId ? { doctors: doctorId } : {};

        //debug the query
        console.log("Query: ", query);

        //getting the patients with sorting and pagination
        const patients = await Patient.find(query).lean()
            .sort({ firstName: order })  //sort by first name
            .skip((page - 1) * limit)
            .limit(limit);

        //logging patients to check the output
        console.log("Patients: ", patients);

        const totalPatients = await Patient.countDocuments(query);

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
            return res.status(400).json({ message: "Invalid patient Id. Please provide a valid Id"});
        }
        const patientData = await Patient.findById(patientId)
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
            return res.status(400).json({message: "Invalid page or limit values. Page and limit must be positive numbers"});
        }

        const medicalRecords = await Record.find({ patient: patientId })
            .populate('doctorId', 'firstName lastName specialization')    //populating doctor details
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        
        const totalRecords = await Record.countDocuments({ patient: patientId});

        if(!medicalRecords.length) {
            return res.status(404).json({ message: "No medical records found for this patient."});
        }

        return res.status(200).json({ totalRecords, medicalRecords });
    } catch (error) {
        console.error("Error fetching medical records: ", error);
        res.status(500).json({ message: "Internal server error ", error: error.message});
    }
};

