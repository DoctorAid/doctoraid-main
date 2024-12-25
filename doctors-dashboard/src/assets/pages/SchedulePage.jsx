import React from 'react'

function SchedulePage() {
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full  px-2 py-2 items-start justify-start text-black'>
    <div className='flex justify-around gap-2 w-full h-[100%]  items-center px-1 py-1'>

      {/* left side */}
      <div className=' flex flex-col sm:flex-wrap justify-between w-full h-full'>
        {/* header */}
        <div className=' w-full h-[10%]'>

          {/* header 01  */}
          <div className="text-black text-[26px] font-bold font-['Raleway'] leading-normal">Current Session</div>
          {/* header 02  */}
          <div className='flex justify-between'>

            {/* header date */}
            <div className="flex items-center w-[88px] h-[88px] bg-[#295567] rounded-[10px]">
              <div className="w-[84px] h-[60px] text-center"><span class="text-[#fefaf6] text-[32px] font-bold font-['Raleway'] leading-7">
                20<br/></span>
                <span class="text-[#fefaf6] text-[32px] font-normal font-['Raleway'] leading-7">Sun</span>
              </div>
            </div>

            <div className='flex flex-col justify-center'>
              <div><span class="text-[#152945] text-2xl font-bold font-['Raleway']">Totol Slots</span>
                  <span class="text-black text-2xl font-medium font-['Raleway'] leading-normal"> - </span>
                  <span class="text-black text-2xl font-normal font-['Raleway'] leading-normal">172</span>
              </div>
              <div className="w-[181px] items-center justify-center h-10 bg-[#cdffcd] rounded-[10px]">
                <div><span class="text-[#295567] text-2xl font-bold font-['Raleway'] leading-normal">Booked - </span>
                      <span class="text-[#295567] text-2xl font-normal font-['Raleway'] leading-normal">20</span>
                </div>
              </div>
            </div>
          </div>

          

          <div className=''></div>

          <div className=''></div>
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
