import patient from "../../../infrastructure/schema/doctor_schema.js";

export const getDoctorDetails = async (req, res) => {
    try {
        const { doctorId, email } = req.query;

        if (!doctorId && !email) {
            return res.status(400).json({ message: "Please provide a doctor ID or email." });
        }

        // Find doctor by ID or email
        const doctor = await Doctor.findOne({ $or: [{ _id: doctorId }, { email }] });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found." });
        }

        return res.status(200).json({
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            email: doctor.email,
            address: doctor.address,
            contactNumber: doctor.contactNumber,
        });

    } catch (error) {
        console.error("Error fetching doctor details:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const addDoctorDetails = async (req, res) => {
    try {
        const { firstName, lastName, email, address, contactNumber } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !address || !contactNumber) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor with this email already exists." });
        }

        // Create new doctor entry
        const newDoctor = new Doctor({
            firstName,
            lastName,
            email,
            address,
            contactNumber,
        });

        // Save doctor to database
        await newDoctor.save();
        return res.status(201).json({ message: "Doctor details added successfully.", doctor: newDoctor });

    } catch (error) {
        console.error("Error adding doctor details:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
