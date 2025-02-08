

function generateTimeslots(startTime, endTime, duration){
    const slots = [];
    let currentSlotTime = new Date(startTime);
    const endTimeDate = new Date(endTime);

    while(currentSlotTime < endTimeDate){
        let slotEndTime = new Date(currentSlotTime) + duration * 6000;
        if(slotEndTime>endTimeDate){
            break;
        }
        slots.push({
            startTime: new Date(currentSlotTime),
            endTime: new Date(slotEndTime),
        });
        currentSlotTime.setTime(slotEndTime.getTime());

    }
    return slots;

}


export const createSlots = async (req,res) =>{
    try{
        const {startTime,endTime,duration} = req.body;

        if (!startTime || !endTime || !duration) {
            return res.status(400).json({ message: 'Missing required data (startTime, endTime, or duration)' });
          }
        const startDate = new Date(`1970-01-01T${startTime}:00`);
        const endDate = new Date(`1970-01-01T${endTime}:00`);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: 'Invalid startTime or endTime format' });
          }

        if (startDate >= endDate) {
        return res.status(400).json({ message: 'Start time must be before end time' });
        }

        const slots = generateTimeslots(startTime,endTime,parseInt(duration));
        
        const formattedSlots = slots.map(slot => ({
            startTime: slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
    
        console.log('Generated slots:', formattedSlots);    

    }catch(error){
        console.error('Error creating slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}