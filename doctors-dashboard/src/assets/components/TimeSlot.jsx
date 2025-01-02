import React from 'react'

function TimeSlot(props) {
  if(props.selectedSlotId === props.timeSlot.id)
    return (

     
         <button className='bg-[#33373baa] text-center rounded-md '>
          {props.timeSlot.time}
          
          </button>

      
     
    )

  else{
    return(
     
      <button className='bg-[#e2ec21aa] text-center rounded-md '
              onClick={() => props.onClick(props.timeSlot.id)}>
       {props.timeSlot.time}
       
       </button>

  

    )
  }
}

export default TimeSlot
