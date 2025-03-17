import mongoose from "mongoose";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Record from "../../../infrastructure/schema/records_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Family from "../../../infrastructure/schema/family_schema.js";

// // Helper function to generate a new family ID
// const generateFamilyId = async () => {
//     const latestFamily = await Family.findOne().sort({ createdAt: -1 });
//     if (!latestFamily) {
//         return 'FAM0001';
//     }
    
//     const lastId = latestFamily.familyId;
//     const numericPart = parseInt(lastId.substring(3), 10);
//     const newNumericPart = numericPart + 1;
//     return `FAM${newNumericPart.toString().padStart(4, '0')}`;
// };

// // Helper function to generate a patient ID
// const generatePatientId = (familyId, memberCount) => {
//     return `${familyId}-${memberCount + 1}`;
// };

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
            relation
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
            // doctors: [],
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
            familyId: formattedFamilyId,
            patientId
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
// export const createPatient = async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             patientId,
//             contactNumber,
//             email,
//             address,
//             weight,
//             height,
//             relation,
//             familyId
//         } = req.body;
       
//         // Validate required fields
//         if (!firstName || !lastName || !dateOfBirth || !gender || !patientId || !contactNumber || 
//             !email || !weight || !height || !relation || !familyId) {
//             return res.status(400).json({ message: "All required fields must be provided." });
//         }

//         // After extracting fields, explicitly check these two
//         // if (!patientId) {
//         //     return res.status(400).json({ message: "patientId is required." });
//         // }
//         // if (!familyId) {
//         //     return res.status(400).json({ message: "familyId is required." });
//         // }
       
//         // Validate address fields
//         if (!address || !address.line1 || !address.city) {
//             return res.status(400).json({ message: "Address line 1 and city are required." });
//         }
       
//         // Validate gender
//         const validGenders = ['Male', 'Female', 'Other'];
//         if (!validGenders.includes(gender)) {
//             return res.status(400).json({ message: "Invalid gender value." });
//         }
       
//         // Check if email already exists
//         const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
//         if (existingPatient) {
//             return res.status(400).json({ message: "A patient with this email already exists." });
//         }
        
//         // Check if patientId already exists
//         const existingPatientId = await Patient.findOne({ patientId });
//         if (existingPatientId) {
//             return res.status(400).json({ message: "A patient with this ID already exists." });
//         }
       
//         // Validate relation
//         const validRelations = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'];
//         if (!validRelations.includes(relation)) {
//             return res.status(400).json({ message: "Invalid relation value." });
//         }
        
//         // Create new patient
//         const newPatient = new Patient({
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             patientId,
//             contactNumber,
//             email: email.toLowerCase(),
//             address: {
//                 line1: address.line1,
//                 line2: address.line2 || '',
//                 city: address.city
//             },
//             weight,
//             height,
//             relation,
//             familyId
//         });
       
//         // Save patient
//         const savedPatient = await newPatient.save();
//         console.log(savedPatient);
       
//         // Return success response
//         return res.status(201).json({
//             message: "Patient created successfully",
//             patient: savedPatient
//         });
//     } catch (error) {
//         console.error('Error creating patient:', error);
//         return res.status(500).json({
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// };


// export const createPatients = async (req, res) => {
//     try {
//         const userId = req.auth.userId; // Clerk provides userId in req.auth
        
//         if (!userId) {
//             return res.status(400).json({ message: "User authentication failed. Please log in again." });
//         }
        
//         const {
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             contactNumber,
//             email,
//             address,
//             weight,
//             height,
//             relation
//         } = req.body;
       
//         // Validate required fields
//         if (!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !email || !weight || !height || !relation) {
//             return res.status(400).json({ message: "All required fields must be provided." });
//         }
       
//         // Validate address fields
//         if (!address || !address.line1 || !address.city) {
//             return res.status(400).json({ message: "Address line 1 and city are required." });
//         }
       
//         // Validate gender
//         const validGenders = ['Male', 'Female', 'Other'];
//         if (!validGenders.includes(gender)) {
//             return res.status(400).json({ message: "Invalid gender value." });
//         }
       
//         // Check if email already exists for patient
//         const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
//         if (existingPatient) {
//             return res.status(400).json({ message: "A patient with this email already exists." });
//         }
       
//         // Validate relation
//         const validRelations = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'];
//         if (!validRelations.includes(relation)) {
//             return res.status(400).json({ message: "Invalid relation value." });
//         }

//         // Check if user already has a family
//         const existingFamily = await Family.findOne({ userId }).select('familyId members');
//         let familyId;
        
//         if (existingFamily) {
//             familyId = existingFamily.familyId;
//         } else {
//             // Generate a new family ID
//             familyId = await generateFamilyId();
            
//             // Create a new family record
//             const newFamily = new Family({
//                 familyId,
//                 userId,
//                 members: [],
//                 createdAt: new Date()
//             });
            
//             // Save family
//             await newFamily.save();
//         }
        
//         // Find family for member count
//         const family = await Family.findOne({ familyId }).select('familyId members');
        
//         // Create patient ID based on existing members
//         const patientId = generatePatientId(familyId, family.members.length);
        
//         // Create new patient
//         const newPatient = new Patient({
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             contactNumber,
//             email: email.toLowerCase(),
//             address: {
//                 line1: address.line1,
//                 line2: address.line2 || '',
//                 city: address.city
//             },
//             weight,
//             height,
//             relation,
//             familyId,
//             patientId
//         });
       
//         // Save patient
//         const savedPatient = await newPatient.save();
        
//         // Update family with new member
//         family.members.push({
//             patient: savedPatient._id,
//             relation
//         });
        
//         await family.save();
        
//         // Return success response
//         return res.status(201).json({
//             message: "Patient added successfully",
//             patient: savedPatient,
//             familyId
//         });
//     } catch (error) {
//         console.error('Error creating patient:', error);
//         return res.status(500).json({
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// };

// Add additional patient (another family member)
// export const addPatient = async (req, res) => {
//     try {
//         const userId = req.auth.userId; // Clerk provides userId in req.auth
        
//         if (!userId) {
//             return res.status(400).json({ message: "User authentication failed. Please log in again." });
//         }
        
//         const {
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             contactNumber,
//             email,
//             address,
//             weight,
//             height,
//             relation
//         } = req.body;
        
//         // Validate required fields
//         if (!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !email || !weight || !height || !relation) {
//             return res.status(400).json({ message: "All required fields must be provided." });
//         }
        
//         // Validate address fields
//         if (!address || !address.line1 || !address.city) {
//             return res.status(400).json({ message: "Address line 1 and city are required." });
//         }
        
//         // Find the user's family
//         const family = await Family.findOne({ userId }).select('familyId members');
//         if (!family) {
//             return res.status(404).json({ message: "No family found for this user. Please create a patient first." });
//         }
        
//         const familyId = family.familyId;
        
//         // Validate gender
//         const validGenders = ['Male', 'Female', 'Other'];
//         if (!validGenders.includes(gender)) {
//             return res.status(400).json({ message: "Invalid gender value." });
//         }
        
//         // Validate relation
//         const validRelations = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'];
//         if (!validRelations.includes(relation)) {
//             return res.status(400).json({ message: "Invalid relation value." });
//         }
        
//         // Check if email already exists
//         const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
//         if (existingPatient) {
//             return res.status(400).json({ message: "A patient with this email already exists." });
//         }
        
//         // Generate patient ID based on the number of existing members
//         const patientId = generatePatientId(familyId, family.members.length);
        
//         // Create new patient
//         const newPatient = new Patient({
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             contactNumber,
//             email: email.toLowerCase(),
//             address: {
//                 line1: address.line1,
//                 line2: address.line2 || '',
//                 city: address.city
//             },
//             weight,
//             height,
//             relation,
//             familyId,
//             patientId
//         });
        
//         // Save patient
//         const savedPatient = await newPatient.save();
        
//         // Update family with new member
//         family.members.push({
//             patient: savedPatient._id,
//             relation
//         });
        
//         await family.save();
        
//         // Return success response
//         return res.status(201).json({
//             message: "Patient added to family successfully",
//             patient: savedPatient
//         });
//     } catch (error) {
//         console.error('Error adding patient to family:', error);
//         return res.status(500).json({
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// };

// For testing purposes (no authentication)
// export const testCreatePatient = async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             contactNumber,
//             email,
//             address,
//             weight,
//             height,
//             relation,
//             userId // Pass this manually for testing
//         } = req.body;
       
//         // Validate required fields
//         if (!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !email || !weight || !height || !relation || !userId) {
//             return res.status(400).json({ message: "All required fields must be provided." });
//         }
       
//         // Validate address fields
//         if (!address || !address.line1 || !address.city) {
//             return res.status(400).json({ message: "Address line 1 and city are required." });
//         }
       
//         // Validate gender
//         const validGenders = ['Male', 'Female', 'Other'];
//         if (!validGenders.includes(gender)) {
//             return res.status(400).json({ message: "Invalid gender value." });
//         }
       
//         // Check if email already exists
//         const existingPatient = await Patient.findOne({ email: email.toLowerCase() });
//         if (existingPatient) {
//             return res.status(400).json({ message: "A patient with this email already exists." });
//         }
       
//         // Validate relation
//         const validRelations = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Sibling', 'Other'];
//         if (!validRelations.includes(relation)) {
//             return res.status(400).json({ message: "Invalid relation value." });
//         }

//         // Check if user already has a family
//         const existingFamily = await Family.findOne({ userId }).select('familyId members');
//         let familyId;
        
//         if (existingFamily) {
//             familyId = existingFamily.familyId;
//         } else {
//             // Generate a new family ID
//             familyId = await generateFamilyId();
            
//             // Create a new family record
//             const newFamily = new Family({
//                 familyId,
//                 userId,
//                 members: [],
//                 createdAt: new Date()
//             });
            
//             // Save family
//             await newFamily.save();
//         }
        
//         // Find family for member count
//         const family = await Family.findOne({ familyId }).select('familyId members');
        
//         // Create patient ID based on existing members
//         const patientId = generatePatientId(familyId, family.members.length);
        
//         // Create new patient
//         const newPatient = new Patient({
//             firstName,
//             lastName,
//             dateOfBirth,
//             gender,
//             contactNumber,
//             email: email.toLowerCase(),
//             address: {
//                 line1: address.line1,
//                 line2: address.line2 || '',
//                 city: address.city
//             },
//             weight,
//             height,
//             relation,
//             familyId,
//             patientId
//         });
       
//         // Save patient
//         const savedPatient = await newPatient.save();
        
//         // Update family with new member
//         family.members.push({
//             patient: savedPatient._id,
//             relation
//         });
        
//         await family.save();
        
//         // Return success response
//         return res.status(201).json({
//             message: "Patient added successfully",
//             patient: savedPatient,
//             familyId
//         });
//     } catch (error) {
//         console.error('Error creating patient:', error);
//         return res.status(500).json({
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// };

// Get user's family members
// export const getFamilyMembers = async (req, res) => {
//     try {
//         const userId = req.auth.userId; // Clerk provides userId in req.auth
        
//         if (!userId) {
//             return res.status(400).json({ message: "User authentication failed. Please log in again." });
//         }
        
//         // Find the family associated with this user
//         const family = await Family.findOne({ userId }).select('familyId members');
        
//         if (!family) {
//             return res.status(404).json({ message: "No family found for this user." });
//         }
        
//         // Get all patients in this family
//         const patients = await Patient.find({ familyId: family.familyId }).lean();
        
//         return res.status(200).json({
//             familyId: family.familyId,
//             members: patients
//         });
//     } catch (error) {
//         console.error("Error fetching family members:", error);
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// Get patient by ID - with validation that patient belongs to user's family
// export const getPatientById = async (req, res) => {
//     try {
//         const userId = req.auth.userId;
//         const { patientId } = req.params;
        
//         if (!userId) {
//             return res.status(400).json({ message: "User authentication failed. Please log in again." });
//         }
        
//         // Find the family associated with this user
//         const family = await Family.findOne({ userId }).select('familyId');
        
//         if (!family) {
//             return res.status(404).json({ message: "No family found for this user." });
//         }
        
//         // Get patient and verify they belong to this family
//         const patient = await Patient.findById(patientId).lean();
        
//         if (!patient) {
//             return res.status(404).json({ message: "Patient not found." });
//         }
        
//         if (patient.familyId !== family.familyId) {
//             return res.status(403).json({ message: "You do not have permission to view this patient." });
//         }
        
//         return res.status(200).json(patient);
//     } catch (error) {
//         console.error("Error fetching patient:", error);
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

// //search patient by first name, last name  or email
// export const searchPatients = async (req, res)  => {
//     try {
//         const { firstName,lastName, email } =req.query;

//         if(!firstName && !lastName && !email) {
//             return res.status(400).json({message: "Please provide a first name, last name  or email to search. "});
//         }

//         const query = {};
//         if (firstName) query.firstName = { $regex: new RegExp(firstName, "i")};    //case insensitive search
//         if (lastName) query.lastName = { $regex: new RegExp(lastName, "i")}; 
//         if (email) query.email = { $regex: new RegExp(email, "i") };

//         const patients = await Patient.find(query);

//         if(!patients.length) {
//             return res.status(404).json({ message: "No patients found."});
//         }
//         return res.status(200).json(patients);

//     }catch (error) {
//         console.error("error searching patients: ", error.message);
//         res.status(500).json({message: "Internal server error", error: error.message});
//     }
// };

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


