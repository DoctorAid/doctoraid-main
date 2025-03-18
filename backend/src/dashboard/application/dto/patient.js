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

export const getNearbyDoctors = async (req, res) => {
    try {
        const { id } = req.params; 
        
        // Validate if id exists and is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Valid patient ID is required." });
        }
        
        // Find the patient by MongoDB ObjectId
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }
        
        const patientCity = patient.address.city;
        
        // Find doctors with matching city in their practice location
        // Using a case-insensitive regex for more flexible matching
        const nearbyDoctors = await Doctor.find({
            $or: [
                { "address.city": { $regex: new RegExp(patientCity, "i") }},
                { "ppLocation": { $regex: new RegExp(patientCity, "i") }}
            ]
        }).select('firstName lastName specialization hospital address ppLocation contactNumber email certification schedule description');
        
        return res.status(200).json({
            message: `Found ${nearbyDoctors.length} doctors near ${patientCity}`,
            patientCity: patientCity,
            doctors: nearbyDoctors
        });
    } catch (error) {
        console.error('Error finding nearby doctors:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const bookSlot = async (req, res) => {
    try {
        const { slotId, patientId, familyId, note } = req.body;
       
        // Validate required fields
        if (!slotId || !patientId || !familyId) {
            return res.status(400).json({ message: "Slot ID, Patient ID, and Family ID are required." });
        }
       
        // Validate MongoDB ObjectIds for all IDs
        if (!mongoose.Types.ObjectId.isValid(slotId) ||
            !mongoose.Types.ObjectId.isValid(patientId) ||
            !mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ message: "Invalid ID format. All IDs must be valid MongoDB ObjectIDs." });
        }
       
        // Find the slot
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: "Slot not found." });
        }
       
        // Check if slot is available
        if (slot.status !== 'available') {
            return res.status(400).json({ message: "This slot is already booked." });
        }
       
        // Find patient to get their name
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }
       
        // Verify the family exists
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ message: "Family not found." });
        }
       
        // Update the slot with booking information
        const updateData = {
            status: 'booked',
            patientId: patientId,
            familyId: familyId,
            patientNote: note || '',
            patientName: `${patient.firstName} ${patient.lastName}`
            // Keeping activated as is, not modifying it
        };
        
        // Use findByIdAndUpdate to ensure all fields are updated
        const updatedSlot = await Slot.findByIdAndUpdate(
            slotId,
            updateData,
            { new: true, runValidators: true }
        );
       
        if (!updatedSlot) {
            return res.status(500).json({ message: "Failed to update slot." });
        }
        
        // Retrieve session details for the response
        const session = await mongoose.model('Session').findById(slot.Session);
       
        return res.status(200).json({
            message: "Appointment booked successfully",
            appointment: {
                id: updatedSlot._id,
                date: session ? session.date : null,
                startTime: updatedSlot.startTime,
                endTime: updatedSlot.endTime,
                duration: updatedSlot.duration,
                patientName: updatedSlot.patientName,
                familyId: updatedSlot.familyId,
                patientId: updatedSlot.patientId,
                note: updatedSlot.patientNote,
                doctorId: session ? session.doctorId : null
            }
        });
    } catch (error) {
        console.error('Error booking slot:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
export const searchDoctors = async (req, res) => {
    try {
        // Get search parameters from query string
        const { 
            name, 
            specialization, 
            city 
        } = req.query;
        
        // Build query object
        const query = {};
        
        // Search by doctor name (first or last)
        if (name) {
            const nameRegex = new RegExp(name, 'i');
            query.$or = [
                { firstName: nameRegex },
                { lastName: nameRegex }
            ];
        }
        
        // Search by specialization
        if (specialization) {
            query.specialization = new RegExp(specialization, 'i');
        }
        
        // Search by city (either in address.city or ppLocation)
        if (city) {
            const cityRegex = new RegExp(city, 'i');
            query.$or = query.$or || [];
            query.$or.push(
                { 'address.city': cityRegex },
                { ppLocation: cityRegex }
            );
        }
        
        // Find doctors matching the query
        const doctors = await Doctor.find(query)
            .select('doctorId firstName lastName specialization hospital address ppLocation contactNumber email certification schedule description');
        
        return res.status(200).json({
            message: `Found ${doctors.length} doctors matching your search criteria`,
            doctors: doctors.map(doctor => ({
                id: doctor._id,
                doctorId: doctor.doctorId,
                name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                specialization: doctor.specialization,
                hospital: doctor.hospital,
                location: doctor.ppLocation,
                address: doctor.address,
                contactNumber: doctor.contactNumber,
                email: doctor.email,
                certification: doctor.certification,
                schedule: {
                    weekdays: doctor.schedule?.weekdays || 'Not specified',
                    weekends: doctor.schedule?.weekends || 'Not specified'
                },
                description: doctor.description
            }))
        });
    } catch (error) {
        console.error('Error searching doctors:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getRecordsByFamilyId = async (req, res) => {
    try {
        const { familyId } = req.params;
        
        // Validate if familyId exists and is a valid ObjectId
        if (!familyId || !mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ message: "Valid family ID is required." });
        }
        
        // Find all records that belong to the specified family
        const records = await Record.find({ familyId: familyId })
            .sort({ createdAt: -1 }); // Sort by creation date, newest first
        
        if (records.length === 0) {
            return res.status(200).json({
                message: "No records found for this family.",
                records: []
            });
        }
        
        return res.status(200).json({
            message: `Found ${records.length} records for this family.`,
            records: records
        });
    } catch (error) {
        console.error('Error retrieving family records:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};