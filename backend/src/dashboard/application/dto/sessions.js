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