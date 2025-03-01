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
export const getPatientsList = async (req, res) => {
    try {
        const { doctorId, sessionDate } = req.query;
        if (!doctorId || !sessionDate) {
            return res.status(400).json({ message: 'Doctor ID and session date are required' });
        }

        const formattedDate = new Date(sessionDate);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ message: 'Invalid session date format' });
        }

        // Find all sessions for the doctor on the given date
        const sessions = await Session.find({ doctor: doctorId, date: formattedDate });
        if (!sessions || sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this doctor on the given date' });
        }

        // Extract session IDs
        const sessionIds = sessions.map(session => session._id);

        // Find all booked slots related to those sessions
        const bookedSlots = await Slot.find({ Session: { $in: sessionIds }, availability: false }).populate({
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
