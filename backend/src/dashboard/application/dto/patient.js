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