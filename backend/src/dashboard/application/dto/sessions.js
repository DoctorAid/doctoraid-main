import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Session from "../../../infrastructure/schema/sessions_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";
import Patient from "../../../infrastructure/schema/patient_schema.js";

export const getSessionsByDocId = async (req, res) => {
    try{
        
        const {doctorId} = req.params;
        const doctor = await Doctor.findOne({doctorId: doctorId});
        const mongoId = doctor._id;
        const sessions = await Session.find({doctorId: mongoId});
        console.log(sessions);
        res.status(200).json(sessions);

    }catch(error){
        res.status(404).json({message: 'cant retrieve sessions'});
    }
}

export const createSession = async (req, res) => {
    const session = req.body;
    const newSession = new Session(session);
    try{
        await newSession.save();
        res.status(201).json(newSession);
    }catch(error){
        res.status(409);
        res.json({message: error.message});
    }
}

export const getBookedSlotsBySession = async (req, res) => {
    try {
        const { sessionId } = req.query;
        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }

        // Find all booked slots for the given session
        const bookedSlots = await Slot.find({ 
            Session: sessionId, 
            availability: false 
        }).populate('patient', 'firstName lastName patientId appointmentTime');

        if (!bookedSlots || bookedSlots.length === 0) {
            return res.status(404).json({ message: 'No booked slots found for this session' });
        }

        // Format the output
        const slotsList = bookedSlots.map(slot => ({
            slotId: slot._id,
            startTime: slot.startTime,
            endTime: slot.endTime,
            duration: slot.duration,
            patient: {
                firstName: slot.patient?.firstName || 'Unknown',
                lastName: slot.patient?.lastName || 'Unknown',
                patientId: slot.patient?.patientId || 'N/A',
                appointmentTime: new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
            }
        }));

        return res.status(200).json(slotsList);
    } catch (error) {
        console.error('Error fetching booked slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getActiveSlotsBySession = async (req, res) => {
    try {
        const { sessionId } = req.query;
        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }

        // Find all active slots (status = 'available') for the given session
        const activeSlots = await Slot.find({ 
            Session: sessionId,  
            status: 'available'  
        });

        if (!activeSlots || activeSlots.length === 0) {
            return res.status(404).json({ message: 'No active slots found for this session' });
        }

        // Format the output
        const slotsList = activeSlots.map(slot => ({
            slotId: slot._id,
            startTime: slot.startTime,
            endTime: slot.endTime,
            duration: slot.duration
        }));

        return res.status(200).json(slotsList);
    } catch (error) {
        console.error('Error fetching active slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPatientList = async (req, res) => {
    try {
        const { sessionId } = req.params;
       
        // Validate if sessionId is a valid MongoDB ObjectId
        if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid session ID format'
            });
        }
        
        // Find booked slots for the given session
        const bookedSlots = await Slot.find({
            Session: sessionId,
            status: 'booked',
            patientId: { $ne: null } // Ensure patient ID exists
        });
        
        if (bookedSlots.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No patients have booked slots for this session',
                data: {
                    patientCount: 0,
                    patients: []
                }
            });
        }
        
        // Extract patient IDs from booked slots
        const patientIds = bookedSlots.map(slot => slot.patientId);
       
        // Find patient details
        const patients = await Patient.find({
            _id: { $in: patientIds }
        }).select('_id name email contactNumber');
        
        // Combine patient data with slot data (time)
        const combinedPatientData = patients.map(patient => {
            // Find the slot for this patient
            const matchingSlot = bookedSlots.find(slot => 
                slot.patientId.toString() === patient._id.toString()
            );
            
            return {
                _id: patient._id,
                patientName: patient.name, // Use the actual name from patient document
                patientId: patient._id,
                email: patient.email,
                contactNumber: patient.contactNumber,
                startTime: matchingSlot ? matchingSlot.startTime : 'N/A',
                endTime: matchingSlot ? matchingSlot.endTime : 'N/A'
            };
        });
        
        return res.status(200).json({
            success: true,
            message: 'Patient list retrieved successfully',
            data: {
                patientCount: combinedPatientData.length,
                patients: combinedPatientData
            }
        });
    } catch (error) {
        console.error('Error in getPatientList:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve patient list',
            error: error.message
        });
    }
};

export const getWaitingList = async (req, res) => {
    try {
        const { sessionId } = req.params;
       
        // Validate if sessionId is a valid MongoDB ObjectId
        if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid session ID format'
            });
        }
        
        // Find the session to get the pin
        const session = await Session.findById(sessionId);
       
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }
        
        // Find booked slots for the given session that have been activated
        const waitingSlots = await Slot.find({
            Session: sessionId,
            status: 'booked',
            activated: true,
            patientId: { $ne: null }
        });
        
        if (waitingSlots.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No patients in the waiting list',
                data: {
                    waitingCount: 0,
                    patients: []
                }
            });
        }
        
        // Create an array to store patient data with appointment time
        const waitingPatients = [];
        
        // For each slot, find the patient and add relevant data
        for (const slot of waitingSlots) {
            const patient = await Patient.findById(slot.patientId)
                .select('_id name email contactNumber');
            
            if (patient) {
                waitingPatients.push({
                    _id: patient._id,
                    name: patient.name, // Using the name field from updated schema
                    email: patient.email,
                    contactNumber: patient.contactNumber,
                    appointmentTime: slot.startTime // Adding the appointment time
                });
            }
        }
        
        return res.status(200).json({
            success: true,
            message: 'Waiting list retrieved successfully',
            data: {
                waitingCount: waitingPatients.length,
                patients: waitingPatients
            }
        });
    } catch (error) {
        console.error('Error in getWaitingList:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve waiting list',
            error: error.message
        });
    }
};