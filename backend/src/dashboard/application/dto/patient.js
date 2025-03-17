import mongoose from "mongoose";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Record from "../../../infrastructure/schema/records_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Family from "../../../infrastructure/schema/family_schema.js";


export const createPatients = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            patientId,
            contactNumber,
            email,
            address,
            weight,
            height,
            relation,
            clerkId
        } = req.body;
       
        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth || !gender || !patientId || !contactNumber || !email || !weight || !height || !relation) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }
       
        // Validate address fields
        if (!address || !address.line1 || !address.city) {
            return res.status(400).json({ message: "Address line 1 and city are required." });
        }
       
        // Validate gender
        const validGenders = ['Male', 'Female', 'Other'];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value." });
        }
       
        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
        if (existingPatient) {
            return res.status(400).json({ message: "A patient with this email already exists." });
        }
       
        // Validate relation
        const validRelations = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'];
        if (!validRelations.includes(relation)) {
            return res.status(400).json({ message: "Invalid relation value." });
        }
        
        // Generate a temporary familyId before creating the Family document
        const tempId = new mongoose.Types.ObjectId();
        const formattedFamilyId = `FM${tempId.toString().slice(-4)}`;
        
        // Create a new Family document with the familyId already set
        const newFamily = new Family({
            familyId: formattedFamilyId,
            clerkId: clerkId || email.toLowerCase(), // Use email as userId if not provided
            members: [] // Empty initially
        });
        
        // Save the family with the pre-generated familyId
        const savedFamily = await newFamily.save();
        
        // Create new patient with the family reference
        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            doctors: [],
            contactNumber,
            email: email.toLowerCase(),
            address: {
                line1: address.line1,
                line2: address.line2 || '',
                city: address.city
            },
            weight,
            height,
            relation,
            familyId: formattedFamilyId
        });
       
        // Save patient
        const savedPatient = await newPatient.save();
        
        // Update family members array with the new patient
        await Family.findByIdAndUpdate(
            savedFamily._id,
            {
                $push: {
                    members: {
                        patient: savedPatient._id,
                        relation: relation
                    }
                }
            }
        );
        
        // Return success response
        return res.status(201).json({
            message: "Patient and family created successfully",
            patient: savedPatient,
            family: {
                familyId: formattedFamilyId,
                _id: savedFamily._id
            }
        });
    } catch (error) {
        console.error('Error creating patient and family:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const addPatient = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            patientId,
            contactNumber,
            email,
            address,
            weight,
            height,
            relation,
            familyId
        } = req.body;
       
        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth || !gender || !patientId || !contactNumber || !email || !weight || !height || !relation || !familyId) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }
       
        // Validate address fields
        if (!address || !address.line1 || !address.city) {
            return res.status(400).json({ message: "Address line 1 and city are required." });
        }
       
        // Validate gender
        const validGenders = ['Male', 'Female', 'Other'];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value." });
        }
       
        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
        if (existingPatient) {
            return res.status(400).json({ message: "A patient with this email already exists." });
        }
       
        // Validate relation
        const validRelations = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'];
        if (!validRelations.includes(relation)) {
            return res.status(400).json({ message: "Invalid relation value." });
        }
        
        // Check if family exists with the provided familyId
        const existingFamily = await Family.findOne({ familyId });
        if (!existingFamily) {
            return res.status(404).json({ message: "Family not found." });
        }
        
        // Create new patient
        const newPatient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            email: email.toLowerCase(),
            address: {
                line1: address.line1,
                line2: address.line2 || '',
                city: address.city
            },
            weight,
            height,
            relation,
            familyId,
            patientId
        });
       
        // Save patient
        const savedPatient = await newPatient.save();
        
        // Update family members array with the new patient
        await Family.findByIdAndUpdate(
            existingFamily._id,
            {
                $push: {
                    members: {
                        patient: savedPatient._id,
                        relation: relation
                    }
                }
            }
        );
        
        // Return success response
        return res.status(201).json({
            message: "Patient added successfully to existing family",
            patient: savedPatient
        });
    } catch (error) {
        console.error('Error adding patient:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params; // This should be the MongoDB ObjectId
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            email,
            address,
            weight,
            height
        } = req.body;

        // Validate if id exists and is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Valid patient ID is required." });
        }

        // Find the patient by MongoDB ObjectId
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }

        // Check if email is being changed and if it already exists
        if (email && email.toLowerCase() !== patient.email) {
            const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
            if (existingPatient) {
                return res.status(400).json({ message: "A patient with this email already exists." });
            }
        }

        // Validate gender if provided
        if (gender) {
            const validGenders = ['Male', 'Female', 'Other'];
            if (!validGenders.includes(gender)) {
                return res.status(400).json({ message: "Invalid gender value." });
            }
        }

        // Create update object with only the fields that are being updated
        const updateData = {};
        
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
        if (gender) updateData.gender = gender;
        if (contactNumber) updateData.contactNumber = contactNumber;
        if (email) updateData.email = email.toLowerCase();
        if (weight) updateData.weight = weight;
        if (height) updateData.height = height;
        
        // Update address if any address field is provided
        if (address) {
            updateData.address = patient.address; // Start with current address
            
            if (address.line1) updateData.address.line1 = address.line1;
            if (address.line2 !== undefined) updateData.address.line2 = address.line2;
            if (address.city) updateData.address.city = address.city;
        }

        // Update patient using findByIdAndUpdate
        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            message: "Patient updated successfully",
            patient: updatedPatient
        });
    } catch (error) {
        console.error('Error updating patient:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
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

//editing patient details
export const editPatientDetails = async (req, res) => {
    try {
        const { patientId } = req.params;
        const updateData = req.body;

        //validating the patient Id
        if(!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: "Invalid patient Id. Please provide a valid ID"});
        }

        //making sure at least one field is provided to update
        if(Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Please provide at least one field to update"});
        }

        //validating gender if given
        if(updateData.gender && !['Male', 'Female', 'Other'].includes(updateData.gender)){
            return res.status(400).json({ message: "Invalid gender value"});
        }

        //validating doctors field if given
        if(updateData.doctors && (!Array.isArray(updateData.doctors) || updateData.doctors.length === 0)){
            return res.status(400).json({ message: "Doctors must be an array and should contain at least one doctor." });
        }

        //validating date of birth if given
        if(updateData.dateOfBirth){
            const dob = new Date(updateData.dateOfBirth);
            if(isNaN(dob.getTime())) {
                return res.status(400).json({ message: "Invalid date of birth format." });
            }
            updateData.dateOfBirth = dob;
        }

        //validating medical history if given
        if(updateData.medicalHistory && !Array.isArray(updateData.medicalHistory)){
            return res.status(400).json({ message: "Medical history must be an array." });
        }

        //validating email if given
        if(updateData.email){
            const existingPatient = await Patient.findOne({ email: updateData.email.toLowerCase(), _id: { $ne: patientId } });
            if(existingPatient){
                return res.status(400).json({ message: "A patient with this email already exists." });
            }
            updateData.email = updateData.email.toLowerCase();

        }

        //updating the patient details
        const updatedPatient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true, runValidators: true });

        if(!updatedPatient){
            return res.status(404).json({ message: "Patient not found." });
        }

        return res.status(200).json({ message: "Patient details updated successfully.", patient: updatedPatient });
    } catch (error) {
        console.error("Error updating patient details: ", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


