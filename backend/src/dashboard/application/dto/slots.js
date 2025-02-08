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

    console.log(slots);
    return slots;
}

export const createSlots = async (req, res) => {
    try {
        const { startTime, endTime, duration } = req.body;

        if (!startTime || !endTime || !duration) {
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

        const slots = generateTimeslots(startDate, endDate, parseInt(duration));

        const formattedSlots = slots.map(slot => ({
            startTime: slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            availability: availability
        }));

        console.log('Generated slots:', formattedSlots);
        return res.status(200).json(formattedSlots);

    } catch (error) {
        console.error('Error creating slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
