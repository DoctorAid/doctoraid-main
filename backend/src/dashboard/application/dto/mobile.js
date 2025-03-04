import Doctor from "../../../infrastructure/schema/doctors_schema.js";
import Patient from "../../../infrastructure/schema/patients_schema.js";
import Slot from "../../../infrastructure/schema/sessions_schema.js";

export const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving doctor', error: error.message });
    }
};

export const searchDoctors = async (req, res) => {
    try {
        const { name, location } = req.query;
        let query = {};
        
        if (name) {
            
            query.$or = [
                { firstName: { $regex: name, $options: 'i' } },
                { lastName: { $regex: name, $options: 'i' } }
            ];
        }
        
        if (location) {
            
            query.$or = query.$or || [];
            query.$or.push(
                { address: { $regex: location, $options: 'i' } }
            );
        }

        const doctors = await Doctor.find(query);
        
        res.status(200).json(doctors);
    } catch (error) {
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