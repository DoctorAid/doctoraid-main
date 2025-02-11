import Session from "../../../infrastructure/schema/sessions_schema.js"

export const getSessions = async (req, res) => {
    try{
        const sessions = await Session.find();
        res.status(200).json(sessions);
    }catch(error){
        res.status(404).json({message: 'cant retrieve sessions'});
    }
}