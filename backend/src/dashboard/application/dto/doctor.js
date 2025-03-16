import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Session from "../../../infrastructure/schema/sessions_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";
import Patient from "../../../infrastructure/schema/patient_schema.js";


export const createDoctor = async (req, res) => {
    try {
        
        const { doctorId, firstName, lastName, email, contactNumber,location, description, schedule, specialization, hospital, address, certification } = req.body;

        if (!firstName || !lastName || !email || !contactNumber || !description ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newDoctor = new Doctor(
            {
            doctorId: doctorId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNumber: contactNumber,
            description: description,
            schedule: schedule,
            specialization: specialization,
            hospital: hospital,
            address: address,
            location: location,
            certification: certification
        });
        

        const savedDoctor = await newDoctor.save();
        return res.status(201).json(savedDoctor);
    } catch (error) {
       
        res.status(500).json({ message: error.message });
    }
};
export const getDoctorDetails = async (req, res) => {
    try {
        const doctors = await Doctor.find({}, 'firstName lastName email contactNumber description schedule');
        return res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctor details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteDoctorDetails = async (req, res) => {
    try {
        const { doctorId } = req.query;

        if (!doctorId) {
            return res.status(400).json({ message: 'Missing required field doctorId' });
        }

        const deleteDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deleteDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        return res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSessionsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.query;
        if (!doctorId) {
            return res.status(400).json({ message: 'Doctor ID is required' });
        }

        const sessions = await Session.find({ doctor: doctorId });
        if (!sessions || sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this doctor' });
        }

        return res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPatientsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.query;
        if (!doctorId) {
            return res.status(400).json({ message: 'Doctor ID is required' });
        }

        const sessions = await Session.find({ doctor: doctorId });
        if (!sessions || sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this doctor' });
        }

        const sessionIds = sessions.map(session => session._id);
        const bookedSlots = await Slot.find({ Session: { $in: sessionIds }, availability: false }).populate('patient', 'firstName lastName patientId email contactNumber');

        if (!bookedSlots || bookedSlots.length === 0) {
            return res.status(404).json({ message: 'No patients found for this doctor' });
        }

        const patientsList = bookedSlots.map(slot => slot.patient);
        return res.status(200).json(patientsList);
    } catch (error) {
        console.error('Error fetching patients by doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addDoctorToPatient = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        if (!patientId || !doctorId) {
            return res.status(400).json({ message: 'Patient ID and Doctor ID are required' });
        }

        const patient = await Patient.findByIdAndUpdate(
            patientId,
            { $addToSet: { 'doctors': doctorId } },
            { new: true }
        ).select('doctors');

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        return res.status(200).json(patient);
    } catch (error) {
        console.error('Error adding doctor to patient:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getActiveAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.query;
        if (!doctorId) {
            return res.status(400).json({ message: 'Doctor ID is required' });
        }

        // Get current date and time
        const currentDate = new Date();

        // Find all active sessions for the doctor (ongoing or upcoming)
        const activeSessions = await Session.find({ 
            doctor: doctorId, 
            date: { $gte: currentDate }  // Only future or ongoing sessions
        });

        if (!activeSessions || activeSessions.length === 0) {
            return res.status(404).json({ message: 'No active sessions found for this doctor' });
        }

        const sessionIds = activeSessions.map(session => session._id);

        // Find booked slots (availability: false) for active sessions
        const activeAppointments = await Slot.find({ 
            Session: { $in: sessionIds }, 
            availability: false 
        }).populate('patient', 'firstName lastName patientId');

        if (!activeAppointments || activeAppointments.length === 0) {
            return res.status(404).json({ message: 'No active appointments found' });
        }

        // Format the output
        const appointmentsList = activeAppointments.map(slot => ({
            firstName: slot.patient?.firstName || 'Unknown',
            lastName: slot.patient?.lastName || 'Unknown',
            patientId: slot.patient?.patientId || 'N/A',
            appointmentTime: new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }));

        return res.status(200).json(appointmentsList);
    } catch (error) {
        console.error('Error fetching active appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTotalPatientCountByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.query;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ message: 'Invalid doctor ID. Please provide a valid ID' });
        }

        // Find all sessions for the doctor
        const sessions = await Session.find({ doctor: doctorId });
        if (!sessions || sessions.length === 0) {
            return res.status(404).json({ message: 'No sessions found for this doctor' });
        }

        const sessionIds = sessions.map(session => session._id);

        // Find all booked slots for the doctor's sessions
        const bookedSlots = await Slot.find({ 
            Session: { $in: sessionIds }, 
            availability: false 
        }).populate('patient', 'patientId');

        if (!bookedSlots || bookedSlots.length === 0) {
            return res.status(200).json({ totalPatients: 0 });
        }

        // Extract unique patient IDs
        const uniquePatients = new Set(bookedSlots.map(slot => slot.patient?.patientId));

        return res.status(200).json({ totalPatients: uniquePatients.size });
    } catch (error) {
        console.error('Error fetching total patient count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

