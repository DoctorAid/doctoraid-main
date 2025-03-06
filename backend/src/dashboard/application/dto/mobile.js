import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import Patient from "../../../infrastructure/schema/patient_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";

// export const getDoctorById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const doctor = await Doctor.findById(id);
        
//         if (!doctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
        
//         res.status(200).json(doctor);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving doctor', error: error.message });
//     }
// };

export const searchDoctors = async (req, res) => {
    try {
        console.log("Search request received:", req.query); 

        const { name, location } = req.query;
        let query = {};

        if (name) {
            query.$or = [
                { firstName: { $regex: name, $options: 'i' } },
                { lastName: { $regex: name, $options: 'i' } }
            ];
        }

        if (location) {
            if (query.$or) {
                query.$and = [{ $or: query.$or }, { location: { $regex: location, $options: 'i' } }];
                delete query.$or;
            } else {
                query.location = { $regex: location, $options: 'i' };
            }
        }

        console.log("Final query:", JSON.stringify(query, null, 2)); 

        const doctors = await Doctor.find(query);
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error searching doctors:", error.message); 
        res.status(500).json({ message: 'Error searching doctors', error: error.message });
    }
};


export const subscribeToDoctor = async (req, res) => {
    try {
        const { doctorId, patientId } = req.body;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (!doctor.subscribers) {
            doctor.subscribers = [];
        }

        if (!doctor.subscribers.includes(patientId)) {
            doctor.subscribers.push(patientId);
            await doctor.save();
        }

        res.status(200).json({ message: 'Subscribed to doctor successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing to doctor', error: error.message });
    }
};

export const getFamilyById = async (req, res) => {
    try {
        const { familyId } = req.params;
        
        const familyMembers = await Patient.find({ familyId: familyId });
        
        if (familyMembers.length === 0) {
            return res.status(404).json({ message: 'No family members found for this family ID' });
        }
        
        res.status(200).json(familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving family profile', error: error.message });
    }
};

export const bookSlot = async (req, res) => {
    try {
        const { patientId, note, slotId, familyId } = req.body;
        
        if (!patientId || !slotId) {
            return res.status(400).json({ message: 'Patient ID and Slot ID are required' });
        }
        
        const slot = await Slot.findById(slotId);
        
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        
        if (slot.status === 'booked') {
            return res.status(400).json({ message: 'Slot is already booked' });
        }
        
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        
        slot.status = 'booked';
        slot.patientId = patientId;
        slot.patientNote = note || '';
        slot.familyId = familyId || '';
        slot.patientName = `${patient.firstName} ${patient.lastName}`;
        
        await slot.save();
        
        res.status(200).json({ message: 'Slot booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking slot', error: error.message });
    }
};

export const getActiveAppointments = async (req, res) => {
    try {
        const { patientId } = req.params;
        
        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required' });
        }
        
        const currentDate = new Date();
        
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentTotalMinutes = currentHours * 60 + currentMinutes;
        
        const appointments = await Slot.find({
            patientId: patientId,
            status: 'booked'
        }).populate('Session');
        
        const activeAppointments = appointments.filter(slot => {
            if (!slot.Session || !slot.Session.date) return false;
            
            const sessionDate = new Date(slot.Session.date);
            const isSameDay = 
                sessionDate.getFullYear() === currentDate.getFullYear() &&
                sessionDate.getMonth() === currentDate.getMonth() &&
                sessionDate.getDate() === currentDate.getDate();
            
            if (!isSameDay) return false;

            const [startHours, startMinutes] = slot.startTime.split(':').map(Number);
            const [endHours, endMinutes] = slot.endTime.split(':').map(Number);
            
            const startTotalMinutes = startHours * 60 + startMinutes;
            const endTotalMinutes = endHours * 60 + endMinutes;
            
            return currentTotalMinutes >= startTotalMinutes && currentTotalMinutes < endTotalMinutes;
        });
        
        return res.status(200).json({
            message: activeAppointments.length
                ? 'Active appointments found'
                : 'No currently active appointments found for this patient',
            appointments: activeAppointments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving active appointments', error: error.message });
    }
};
