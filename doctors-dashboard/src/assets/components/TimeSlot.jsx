import React from 'react'

function TimeSlot(props) {
  if(props.selectedSlotId === props.timeSlot._id)
    return (
   
         <button className='border bg-[#b6e44baa] border-[#353637] text-center rounded-md '>
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
     
        <button className='border bg-[#2082ecaa] text-center rounded-md '
                onClick={() => props.onClick(props.timeSlot._id)}>
         {props.timeSlot.startTime}
         
        </button>
  
      )
    }
  }
}

export default TimeSlot
