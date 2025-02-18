import Session from "../../../infrastructure/schema/sessions_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";


function generateTimeslots(startTime, endTime, duration) {
    const slots = [];
    let currentSlotTime = new Date(startTime);
    const endTimeDate = new Date(endTime);

    while (currentSlotTime < endTimeDate) {
        let slotEndTime = new Date(currentSlotTime.getTime() + duration * 60000); // Convert minutes to milliseconds
        if (slotEndTime > endTimeDate) {
            break;
        }
        slots.push({
            startTime: new Date(currentSlotTime),
            endTime: new Date(slotEndTime),
        });
        currentSlotTime = new Date(slotEndTime); // Move to next slot
    }
    return slots;
}

export const createSlots = async (req, res) => {
    try {
        const { startTime, endTime, date, duration } = req.body;

        if (!startTime || !endTime || !date || !duration) {
            return res.status(400).json({ message: 'Missing required data (startTime, endTime, or duration)' });
        }

        const startDate = new Date(`1970-01-01T${startTime}:00`); // Corrected date format
        const endDate = new Date(`1970-01-01T${endTime}:00`);
        const availability = new Boolean(true);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: 'Invalid startTime or endTime format' });
        }

        if (startDate >= endDate) {
            return res.status(400).json({ message: 'Start time must be before end time' });
        }

        //creates a new session for the slots
        const session_time = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const new_session = new Session({date:date,time:session_time});   // creating a new session
        const saved_session = await new_session.save(); // saving the session in db
        console.log("new session created successfully");

        const session_id = saved_session._id; // getting the session id

        const slots = generateTimeslots(startDate, endDate, parseInt(duration));

        const formattedSlots = slots.map(slot => ({
            Session: session_id,
            startTime: slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: duration,
            status: 'available',
        }));

        formattedSlots.map(async (slot) => {
            const new_slot = new Slot(slot);
            await new_slot.save();
        })

        console.log("slots created successfully");
        return res.status(200).json(formattedSlots);

    } catch (error) {
        console.error('Error creating slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getSlotsbySession = async (req,res) => {
    try{
        const slots = await Slot.find({Session: req.params.id}).populate('Session');
        res.status(200).json(slots);
    }catch(error){
        res.status(404).json({message: 'cant retrieve slots'});
    }
};