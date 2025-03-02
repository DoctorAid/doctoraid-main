import patient from "../../../infrastructure/schema/patient_schema.js";

//search patient by name or email
export const searchPatients = async (req, res)  => {
    try {
        const { name, email } =req.query;

        if(!name && !email) {
            return res.status(400).json({message: "Please provide a name or email to search. "});
        }

        const query = {};
        if (name) query.name = { $regex: new RegExp(name, "i")};    //case insenstive search
        if (email) query.email = { $regex: new RegExp(email, "i") };


        const patients = await patient.find(query);
        return res.status(200).json(patients);

    }catch (error) {
        console.error("error searching patients: ", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

//getting the patient list
export const getPatientList = async(req, res) => {
    try {
        // Use 'let' instead of 'const' so we can reassign values
        let {page = 1, limit = 10} = req.query;

        // Convert to numbers
        page = Number(page);
        limit = Number(limit);

        if(isNaN(page) || isNaN(limit) || page < 1 || limit < 1){
            return res.status(400).json({ message: "Invalid page or limit values. Page and limit must be positive numbers"});
        }

        const patients = await patient.find()
            .skip((page - 1) * limit)  // Fixed parentheses issue
            .limit(limit);

        const totalPatients = await patient.countDocuments();

        return res.status(200).json({ totalPatients, patients});
    } catch (error) {
        console.error("Error fetching patient list: ", error);
        res.status(500).json({ message: "Internal server error", error: error.message});
    }
};

//sorting the patient list
