import mongoose from "mongoose";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Record from "../../../infrastructure/schema/records_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Family from "../../../infrastructure/schema/family_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";

export const createPatients = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            email,
            address,
            weight,
            height,
            relation,
            clerkId
        } = req.body;
       
        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !email || !weight || !height || !relation) {
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
            contactNumber,
            email,
            address,
            weight,
            height,
            relation,
            familyId
        } = req.body;
       
        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !email || !weight || !height || !relation || !familyId) {
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
            familyId
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
        const { slotId } = req.params;  // Get slotId from URL params
        const { patientId, familyId, note } = req.body;
       
        // Validate required fields
        if (!patientId || !familyId) {
            return res.status(400).json({ 
                success: false,
                message: "Patient ID and Family ID are required." 
            });
        }
       
        // Validate MongoDB ObjectIds for all IDs
        if (!mongoose.Types.ObjectId.isValid(slotId) ||
            !mongoose.Types.ObjectId.isValid(patientId) ||
            !mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid ID format. All IDs must be valid MongoDB ObjectIDs." 
            });
        }
       
        // Find the slot
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ 
                success: false,
                message: "Slot not found." 
            });
        }
       
        // Check if slot is available
        if (slot.status !== 'available') {
            return res.status(400).json({ 
                success: false,
                message: "This slot is already booked." 
            });
        }
       
        // Find patient to get their name
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ 
                success: false,
                message: "Patient not found." 
            });
        }
       
        // Verify the family exists
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ 
                success: false,
                message: "Family not found." 
            });
        }
       
        // Update the slot with booking information
        const updateData = {
            status: 'booked',
            patientId: patientId,
            familyId: familyId,
            patientNote: note || '',
            patientName: `${patient.firstName} ${patient.lastName}`
        };
        
        // Use findByIdAndUpdate to ensure all fields are updated
        const updatedSlot = await Slot.findByIdAndUpdate(
            slotId,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedSlot) {
            return res.status(500).json({ 
                success: false,
                message: "Failed to update slot." 
            });
        }
        
        // Retrieve session details for the response
        const session = await mongoose.model('Session').findById(slot.Session);
        
        return res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
            data: {
                appointmentId: updatedSlot._id,
                date: session ? session.date : null,
                startTime: updatedSlot.startTime,
                endTime: updatedSlot.endTime,
                duration: updatedSlot.duration,
                patientName: updatedSlot.patientName,
                patientId: updatedSlot.patientId,
                familyId: updatedSlot.familyId,
                note: updatedSlot.patientNote,
                doctorId: session ? session.doctorId : null
            }
        });
    } catch (error) {
        console.error('Error booking slot:', error);
        return res.status(500).json({
            success: false,
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

export const subscribeDoctor = async (req, res) => {
    try {
        const { familyId, doctorId } = req.body;
        
        // Validate required fields
        if (!familyId || !doctorId) {
            return res.status(400).json({ 
                success: false,
                message: "Family ID and Doctor ID are required." 
            });
        }
        
        // Validate MongoDB ObjectId for familyId
        if (!mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Family ID format. Must be a valid MongoDB ObjectID." 
            });
        }
        
        // Validate MongoDB ObjectId for doctorId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Doctor ID format. Must be a valid MongoDB ObjectID." 
            });
        }
        
        // Find the family by ObjectId
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ 
                success: false,
                message: "Family not found." 
            });
        }
        
        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ 
                success: false,
                message: "Doctor not found." 
            });
        }
        
        // Check if the doctor is already in the family's doctors array
        const isAlreadySubscribed = family.doctors.some(
            doc => doc.doctor.toString() === doctorId
        );
        
        if (isAlreadySubscribed) {
            return res.status(400).json({ 
                success: false,
                message: "This family is already subscribed to this doctor." 
            });
        }
        
        // Add the doctor to the family's doctors array
        family.doctors.push({ doctor: doctorId });
        
        // Save the updated family document
        await family.save();
        
        return res.status(200).json({
            success: true,
            message: "Successfully subscribed to the doctor",
            data: {
                familyId: family._id,
                doctor: {
                    id: doctor._id,
                    doctorId: doctor.doctorId,
                    name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                    specialization: doctor.specialization,
                    hospital: doctor.hospital,
                    ppLocation: doctor.ppLocation
                }
            }
        });
    } catch (error) {
        console.error('Error subscribing to doctor:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const unsubscribeDoctor = async (req, res) => {
    try {
        const { familyId, doctorId } = req.body;
        
        // Validate required fields
        if (!familyId || !doctorId) {
            return res.status(400).json({ 
                success: false,
                message: "Family ID and Doctor ID are required." 
            });
        }
        
        // Validate MongoDB ObjectId for familyId
        if (!mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Family ID format. Must be a valid MongoDB ObjectID." 
            });
        }
        
        // Validate MongoDB ObjectId for doctorId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Doctor ID format. Must be a valid MongoDB ObjectID." 
            });
        }
        
        // Find the family by ObjectId
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(404).json({ 
                success: false,
                message: "Family not found." 
            });
        }
        
        // Check if the doctor exists in the subscription list
        const doctorIndex = family.doctors.findIndex(
            doc => doc.doctor.toString() === doctorId
        );
        
        if (doctorIndex === -1) {
            return res.status(400).json({ 
                success: false,
                message: "This family is not subscribed to this doctor." 
            });
        }
        
        // Remove the doctor from the family's doctors array
        family.doctors.splice(doctorIndex, 1);
        
        // Save the updated family document
        await family.save();
        
        return res.status(200).json({
            success: true,
            message: "Successfully unsubscribed from the doctor",
            data: {
                familyId: family._id
            }
        });
    } catch (error) {
        console.error('Error unsubscribing from doctor:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getSubscribedDoctors = async (req, res) => {
    try {
        const { familyId } = req.params;
        
        // Validate familyId
        if (!familyId) {
            return res.status(400).json({ 
                success: false,
                message: "Family ID is required." 
            });
        }
        
        // Validate MongoDB ObjectId for familyId
        if (!mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Family ID format. Must be a valid MongoDB ObjectID." 
            });
        }
        
        // Find the family by ObjectId
        const family = await Family.findById(familyId)
            .populate({
                path: 'doctors.doctor',
                select: 'doctorId firstName lastName specialization hospital ppLocation contactNumber email certification description schedule'
            });
            
        if (!family) {
            return res.status(404).json({ 
                success: false,
                message: "Family not found." 
            });
        }
        
        // Format the doctors data for the response
        const subscribedDoctors = family.doctors.map(item => {
            const doctor = item.doctor;
            return {
                id: doctor._id,
                doctorId: doctor.doctorId,
                name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                specialization: doctor.specialization,
                hospital: doctor.hospital,
                location: doctor.ppLocation,
                contactNumber: doctor.contactNumber,
                email: doctor.email,
                certification: doctor.certification,
                description: doctor.description,
                schedule: doctor.schedule
            };
        });
        
        return res.status(200).json({
            success: true,
            message: `Found ${subscribedDoctors.length} subscribed doctors`,
            data: {
                familyId: family._id,
                subscribedDoctors
            }
        });
    } catch (error) {
        console.error('Error getting subscribed doctors:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const enterPin = async (req, res) => {
    try {
        const { pin, slotId } = req.body;
        
        // Find the slot
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        
        // Get session using sessionId from the slot
        const session = await Session.findById(slot.Session);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        
        // Verify if PIN is correct
        if (session.pin !== pin) {
            return res.status(401).json({ message: 'Invalid PIN' });
        }
        
        // Update slot activation status
        slot.activated = true;
        await slot.save();
        
        res.status(200).json({ 
            message: 'PIN entered successfully', 
            activated: true,
            slot: slot
        });
    } catch (error) {
        res.status(500).json({ message: 'Error entering PIN', error: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const { familyId } = req.params;
        
        // Validate familyId
        if (!familyId) {
            return res.status(400).json({ 
                success: false,
                message: "Family ID is required." 
            });
        }
        
        // Validate MongoDB ObjectId for familyId
        if (!mongoose.Types.ObjectId.isValid(familyId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Family ID format. Must be a valid MongoDB ObjectID." 
            });
        }
        
        // Find all slots booked by this family using MongoDB ObjectId
        const bookings = await Slot.find({ 
            familyId: familyId, // MongoDB will automatically handle the ObjectId comparison
            status: 'booked'
        }).populate({
            path: 'Session',
            select: 'date doctorId',
            populate: {
                path: 'doctorId',
                model: 'Doctor',
                select: 'firstName lastName specialization hospital ppLocation email contactNumber'
            }
        }).populate({
            path: 'patientId',
            select: 'firstName lastName dateOfBirth contactNumber email'
        }).sort({ 'Session.date': 1, startTime: 1 }); // Sort by date and time
        
        if (bookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookings found for this family.",
                data: {
                    familyId: familyId,
                    bookings: []
                }
            });
        }
        
        // Format the response data
        const formattedBookings = bookings.map(booking => {
            const session = booking.Session;
            const doctor = session?.doctorId;
            const patient = booking.patientId;
            
            return {
                bookingId: booking._id,
                sessionId: session?._id || null,
                date: session?.date || null,
                time: {
                    start: booking.startTime,
                    end: booking.endTime,
                    duration: booking.duration
                },
                doctor: doctor ? {
                    id: doctor._id,
                    name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                    specialization: doctor.specialization,
                    hospital: doctor.hospital,
                    location: doctor.ppLocation,
                    contactNumber: doctor.contactNumber,
                    email: doctor.email
                } : null,
                patient: patient ? {
                    id: patient._id,
                    name: `${patient.firstName} ${patient.lastName}`,
                    dateOfBirth: patient.dateOfBirth,
                    contactNumber: patient.contactNumber,
                    email: patient.email
                } : {
                    name: booking.patientName
                },
                patientNote: booking.patientNote,
                status: booking.status,
                recordCreated: booking.recordId ? true : false,
                activated: booking.activated
            };
        });
        
        // Group bookings by upcoming and past based on current date
        const currentDate = new Date();
        const upcomingBookings = [];
        const pastBookings = [];
        
        formattedBookings.forEach(booking => {
            if (!booking.date) return;
            
            const bookingDate = new Date(booking.date);
            if (bookingDate >= currentDate) {
                upcomingBookings.push(booking);
            } else {
                pastBookings.push(booking);
            }
        });
        
        // Sort upcoming bookings by date (soonest first)
        upcomingBookings.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Sort past bookings by date (most recent first)
        pastBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return res.status(200).json({
            success: true,
            message: `Found ${bookings.length} bookings for this family.`,
            data: {
                familyId: familyId,
                totalBookings: bookings.length,
                upcomingBookings: upcomingBookings,
                pastBookings: pastBookings
            }
        });
    } catch (error) {
        console.error('Error retrieving family bookings:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
