import React from 'react'

function SchedulePage() {
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full  px-2 py-2 items-start justify-start text-black'>
    <div className='flex justify-around gap-2 w-full h-[100%]  items-center px-1 py-1'>

      {/* left side */}
      <div className=' flex flex-col sm:flex-wrap justify-between w-full h-full'>
        <div className=' w-full h-[10%]'>
        <div className="text-black text-[26px] font-bold font-['Raleway'] leading-normal">Current Session</div>
        </div>
        <div className='bg-[#e531d6] w-full h-[50%]'>
          <p>Section 01</p>
        </div>
        <div className='bg-[#d22632] w-full h-[30%]'>
          <p>Section 01</p>
        </div>
        
      </div>

        {/* right side */}
      <div className='flex flex-col gap-2 bg-[#3gcf3b] w-full h-full'>
        <div className='flex bg-[#3bff3b] w-full h-[50%]'>
        <p>Section 02</p>
        </div>
        <div className='flex bg-[#3bcf3b] w-full h-[50%]'>
        <p>Section 02</p>
        </div>
        </div>
    </div>

   
    
    
  </div>
    


  )
}

export default SchedulePage
