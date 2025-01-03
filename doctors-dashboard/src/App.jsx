import React from 'react'
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation'

function App() {
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full px-2 py-2 items-start justify-start text-black'>
      
      <DashboardNavigation/>

      {/* Top Section */}
      <div className='flex justify-around gap-2 w-full h-[40%] bg-[#93b1ec] items-center px-1 py-1'>
        <div className='bg-[#b7f877] w-full h-full flex items-center justify-center'><p>Section 01</p></div>
        <div className='bg-[#3bcf3b] w-full h-full flex items-center justify-center'><p>Section 02</p></div>
      </div>

      {/* Bottom Section */}
      <div className='flex justify-around gap-2 w-full h-[60%] bg-[#93b1ec] items-center px-1 py-1'>
        <div className='bg-[#2e38f8] w-full h-full flex items-center justify-center'><p>Section 01</p></div>
        <div className='bg-[#7da4f2] w-full h-full flex items-center justify-center'><p>Section 02</p></div>

        {/* Consultation History Section */}
        <div className='bg-white w-full h-full flex flex-col items-start px-6 py-4 shadow-md rounded-lg overflow-y-scroll'>
          <h2 className='text-lg font-semibold mb-4 text-black'>Consultation History</h2>

          {/* Consultation Item 1 */}
          <div className='w-full border-b pb-3 mb-3'>
            <p className='text-sm text-black'><span className='font-bold'>Last Checked</span> <span className='font-normal'>10 Dec 2024</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Observation</span> <span className='font-normal'>Fever, Fatigue</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Prescription</span> <span className='font-normal'>Paracetamol, Vitamin C</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Note</span> <span className='font-normal'>Rest and hydrate properly.</span></p>
          </div>

          {/* Consultation Item 2 */}
          <div className='w-full border-b pb-3 mb-3'>
            <p className='text-sm text-black'><span className='font-bold'>Last Checked</span> <span className='font-normal'>22 Nov 2024</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Observation</span> <span className='font-normal'>Cough, Sore Throat</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Prescription</span> <span className='font-normal'>Cough Syrup, Warm Fluids</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Note</span> <span className='font-normal'>Avoid cold drinks and spicy food.</span></p>
          </div>

          {/* Consultation Item 3 */}
          <div className='w-full border-b pb-3 mb-3'>
            <p className='text-sm text-black'><span className='font-bold'>Last Checked</span> <span className='font-normal'>05 Oct 2024</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Observation</span> <span className='font-normal'>Headache, Dizziness</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Prescription</span> <span className='font-normal'>Pain Reliever, Electrolytes</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Note</span> <span className='font-normal'>Reduce screen time and stress.</span></p>
          </div>

          {/* Consultation Item 4 */}
          <div className='w-full border-b pb-3 mb-3'>
            <p className='text-sm text-black'><span className='font-bold'>Last Checked</span> <span className='font-normal'>12 Sep 2024</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Observation</span> <span className='font-normal'>Allergy, Itching</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Prescription</span> <span className='font-normal'>Antihistamines, Skin Cream</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Note</span> <span className='font-normal'>Avoid allergens and moisturize skin.</span></p>
          </div>

          {/* Consultation Item 5 */}
          <div className='w-full border-b pb-3 mb-3'>
            <p className='text-sm text-black'><span className='font-bold'>Last Checked</span> <span className='font-normal'>25 Aug 2024</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Observation</span> <span className='font-normal'>Back Pain, Muscle Stiffness</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Prescription</span> <span className='font-normal'>Pain Balm, Physiotherapy</span></p>
            <p className='text-sm text-black'><span className='font-bold'>Note</span> <span className='font-normal'>Stretch regularly and avoid lifting heavy objects.</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App