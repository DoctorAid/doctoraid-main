import Doctor from "../../../infrastructure/schema/doctor_schema.js";

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