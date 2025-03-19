import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Session from "../../../infrastructure/schema/sessions_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";
import Patient from "../../../infrastructure/schema/patient_schema.js";

export const getSessions = async (req, res) => {
    try{
        const sessions = await Session.find();
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
        }).select('_id firstName lastName email contactNumber');

        return res.status(200).json({
            success: true,
            message: 'Patient list retrieved successfully',
            data: {
                patientCount: patients.length,
                patients: patients
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
        // Assumption: slot is activated when patient enters the pin
        const waitingPatients = await Slot.find({
            Session: sessionId,
            status: 'booked',
            activated: true,
            patientId: { $ne: null }
        });

        if (waitingPatients.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No patients in the waiting list',
                data: {
                    waitingCount: 0,
                    patients: []
                }
            });
        }

        // Extract patient IDs from waiting slots
        const patientIds = waitingPatients.map(slot => slot.patientId);
        
        // Find patient details
        const patients = await Patient.find({
            _id: { $in: patientIds }
        }).select('_id firstName lastName email contactNumber');

        return res.status(200).json({
            success: true,
            message: 'Waiting list retrieved successfully',
            data: {
                waitingCount: patients.length,
                patients: patients
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