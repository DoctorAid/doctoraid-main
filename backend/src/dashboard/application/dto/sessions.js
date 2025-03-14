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




export const getPatientsList = async (req, res) => {
    try {
        const { doctorId, sessionId } = req.query;
        if (!doctorId || !sessionId) {
            return res.status(400).json({ message: 'Doctor ID and session ID are required' });
        }

        // Find all sessions for the doctor with the given session ID
        const session = await Session.findOne({ doctor: doctorId, _id: sessionId });
        if (!session) {
            return res.status(404).json({ message: 'No sessions found for this doctor with the given session ID' });
        }

        // Find all booked slots related to that session
        const bookedSlots = await Slot.find({ Session: session._id, availability: false }).populate({
            path: 'patient',
            select: 'firstName lastName patientId appointmentTime'
        });

        if (!bookedSlots || bookedSlots.length === 0) {
            return res.status(404).json({ message: 'No booked slots found' });
        }

        // Extract patients from booked slots
        const patientsList = bookedSlots.map(slot => ({
            firstName: slot.patient?.firstName || 'Unknown',
            lastName: slot.patient?.lastName || 'Unknown',
            patientId: slot.patient?.patientId || 'N/A',
            appointmentTime: new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }));

        return res.status(200).json(patientsList);
    } catch (error) {
        console.error('Error fetching patient list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getWaitingList = async (req, res) => {
    try {
        const { doctorId, sessionId } = req.query;
        if (!doctorId || !sessionId) {
            return res.status(400).json({ message: 'Doctor ID and session ID are required' });
        }

        // Find the session for the doctor with the given session ID
        const session = await Session.findOne({ doctor: doctorId, _id: sessionId });
        if (!session) {
            return res.status(404).json({ message: 'No session found for this doctor with the given session ID' });
        }

        // Find all booked slots related to the session where patients have checked in by entering a pin
        const waitingList = await Slot.find({ 
            Session: sessionId, 
            availability: false,
            'patient.pinEntered': true  // Assuming there is a 'pinEntered' field in patient schema indicating the pin entry
        }).populate({
            path: 'patient',
            select: 'firstName lastName patientId'
        });

        if (!waitingList || waitingList.length === 0) {
            return res.status(404).json({ message: 'No patients in the waiting list' });
        }

        // Extract patients from the waiting list
        const patientsWaiting = waitingList.map(slot => ({
            firstName: slot.patient?.firstName || 'Unknown',
            lastName: slot.patient?.lastName || 'Unknown',
            patientId: slot.patient?.patientId || 'N/A'
        }));

        return res.status(200).json(patientsWaiting);
    } catch (error) {
        console.error('Error fetching waiting list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

