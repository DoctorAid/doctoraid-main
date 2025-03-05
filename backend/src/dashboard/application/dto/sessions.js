import Session from "../../../infrastructure/schema/sessions_schema.js"

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



