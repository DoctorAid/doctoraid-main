import React from 'react'

function TimeSlot(props) {
  if(props.selectedSlotId === props.timeSlot.id)
    return (

      <div className='flex flex-col justify-center'>
         <button className='bg-[#33373baa] text-center rounded-md '>
          {props.timeSlot.time}
          
          </button>

      </div>
     
    )

  else{
    return(
      <div className='flex flex-col justify-center'>
      <button className='bg-[#7eb6fbaa] text-center rounded-md '
              onClick={() => props.onClick(props.timeSlot.id)}>
       {props.timeSlot.time}
       
       </button>

   </div>

    )
  }
}

export default TimeSlot
