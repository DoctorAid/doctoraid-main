import React from 'react'

function TimeSlot(props) {
  if(props.selectedSlotId === props.timeSlot.id)
    return (
   
         <button className='border bg-[#b6e44baa] border-[#353637] text-center rounded-md '>
          {props.timeSlot.time}
          
          </button>     
  
    )

  else{
    if(props.timeSlot.status === "Booked")
      return(
        <button className='border bg-[#5b6674aa] text-center rounded-md '
                onClick={() => props.onClick(props.timeSlot.id)}>
        {props.timeSlot.time}
 
        </button> 
      )
   
    else{
      return(
     
        <button className='border bg-[#2082ecaa] text-center rounded-md '
                onClick={() => props.onClick(props.timeSlot.id)}>
         {props.timeSlot.time}
         
        </button>
  
      )
    }
  }
}

export default TimeSlot
