

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


}