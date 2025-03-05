import mongoose from "mongoose";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Record from "../../../infrastructure/schema/records_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";


//creating a new patient
export const createPatients = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, doctors, contactNumber, email, address, medicalHistory } = req.body;

        //validating the fields
        if (!firstName || !lastName || !dateOfBirth || !gender || !doctors || !contactNumber || !email || !address ) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        //ensuring the gender is valid
        const validGenders = ["Male", "Female", "Other"];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value." });
        }

        //ensuring email is unique
        const emailLower = email.trim().toLowerCase();
        const existingPatient = await Patient.findOne({ email: emailLower });
        if (existingPatient) {
            return res.status(400).json({ message: "A patient with this email already exists." });
        }

        //ensure doctors array is not empty
        if (!Array.isArray(doctors) || doctors.length === 0) {
            return res.status(400).json({ message: "At least one doctor must be assigned." });
        }

        //validating doctor Ids
        const invalidDoctors = doctors.filter(doctorId => !mongoose.Types.ObjectId.isValid(doctorId));
        if (invalidDoctors.length > 0) {
            return res.status(400).json({ message: `Invalid doctor ID: ${invalidDoctors.join(", ")}` });

        }

        //create a new patient
        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            doctors,
            contactNumber,
            email: emailLower,
            address,
            medicalHistory: medicalHistory || []    //default empty array if not provided
        });

        await newPatient.save();
        return res.status(201).json({ message: "patient created successfully", patient: newPatient });


    } catch (error) {
        console.error("Error creating patient:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//search patient by name or email
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

        //validate doctor id
        if (doctorId && !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: "Invalid doctorId. Please provide a valid Id"});
        }

        //validating the sorting method
        const order = sortMethod === "desc" ? -1 : 1;

        //query to filter by doctors Id if provided
        const query = doctorId ? { doctors: doctorId } : {};

        //getting the patients with sorting and pagination
        const patients = await Patient.find(query).lean()
            .sort({ lastName: order, firstName: order })  //sort by name, last name is pioritized
            .skip((page - 1) * limit)
            .limit(limit);

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

