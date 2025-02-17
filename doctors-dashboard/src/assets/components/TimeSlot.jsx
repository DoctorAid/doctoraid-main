import React from 'react'

function TimeSlot(props) {
  if(props.selectedSlotId === props.timeSlot._id)
    return (
   
         <button className='border bg-[#295567] border-[#353637] text-center text-[#ffffff] rounded-md '>
          {props.timeSlot.startTime}
          
          </button>     
  
    )

  else{
    if(props.timeSlot.status === "booked")
      return(
        <button className='border bg-[#5b6674aa] text-center rounded-md '
                onClick={() => props.onClick(props.timeSlot._id)}>
        {props.timeSlot.startTime}
 
        </button> 
      )
   
    else{
      return(
     
        <button className='border bg-[#C9E4F3] text-center rounded-md '
                onClick={() => props.onClick(props.timeSlot._id)}>
         {props.timeSlot.startTime}
         
        </button>
  
      )
    }
  }
}

export default TimeSlot
