import Session from "../../../infrastructure/schema/sessions_schema.js";
import Slot from "../../../infrastructure/schema/slots_schema.js";
import Doctor from "../../../infrastructure/schema/doctor_schema.js";
import mongoose from "mongoose";

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
        const { doctorid, startTime, endTime, date, duration, pin } = req.body;

        if ( !doctorid || !startTime || !endTime || !date || !duration || !pin) {

            return res.status(400).json({ message: 'Missing required data (doctorid,startTime, endTime, or duration)' });
        }
        
        const doctor = await Doctor.findOne({ doctorId: doctorid });
        console.log("Doctor:", doctor);
        if (doctor) {
            const doctorId = doctor._id.toString() // Directly access _id
            console.log("Doctor ID:", doctorId);
        } else {
            console.log("No doctor found with the given ID");
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
    const new_session = new Session({doctorId:new mongoose.Types.ObjectId(doctor._id),date:date,time:session_time, pin:pin});   // creating a new session
        const saved_session = await new_session.save(); // saving the session in db
        console.log("new session created successfully");

        const session_id = saved_session._id; // getting the session id

        const slots = generateTimeslots(startDate, endDate, parseInt(duration));

        const formattedSlots = slots.map(slot => ({
            Session: session_id,
            startTime: slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: duration,
            status: 'available'
        }));

        formattedSlots.map(async (slot) => {
            const new_slot = new Slot(slot);
            await new_slot.save();
        })

        console.log("slots created successfully");
        return res.status(200).json(formattedSlots);

    } catch (error) {
        console.error('Error creating slots:', error);
        res.status(500).json({ message: error.message });
    }
};



export const getSlotsbySession = async (req, res) => {
    try {
        const slot_id = req.params.id;

        // Check if the session ID exists
        const sessionExists  = await Session.exists({ _id: slot_id });
        if (!sessionExists) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }

        // Find slots linked to the session
        const slots = await Slot.find({ Session: slot_id }).populate('Session');
        if (slots.length === 0) {
            res.status(200).json({ message: 'No slots found for this session' });
            return;
        }

        res.status(200).json(slots);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


//cancelling appointment using session id
export const cancelAppointment = async (req, res) => {
    try {
        const slot_id = req.params.id;

        if (!slot_id) {
            return res.status(400).json({ message: 'Slot ID is required' });
        }

        // Check if the slot exists before updating
        const existingSlot = await Slot.findById(slot_id);
        if (!existingSlot) {
            return res.status(404).json({ message: 'Slot not found in database' });
        }

        console.log("Existing slot:", existingSlot); // Debugging log

        // Update the slot
        const updatedSlot = await Slot.findByIdAndUpdate(
            slot_id,
            {
                $set: {
                    status: 'available',
                    patientNote: null,
                    familyId: null,
                    patientId: null,
                    patientName: null,
                    recordId: null
                }
            },
            { new: true }
        );

        console.log("Updated slot:", updatedSlot); // Debugging log

        return res.status(200).json({ message: 'Slot cancelled successfully', updatedSlot });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// const updateSlot = await Slot.findOneAndUpdate(
    
//     {_id:slot_id, Session: session_id, status: { $ne: 'available'} },   //only updating if the status is not already available
//     {
//         $set: {
//             status: 'available',
//             patientNote: '',
//             familyId: '',
//             patientId: null,
//             patientName: '',
//             recordId: null

//         }
//     },
//     { new: true } //returns the updated document


//     if (!updateSlot ) {
//         return res.status(404).json({ message: 'Slot not found or slot is already available'});
//     }

//     res.status(200).json({ message: 'Appointment cancelled successfully', updateSlot });
//     catch (error) {
//     console.error('Error cancelling the appointment', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//     }
// );