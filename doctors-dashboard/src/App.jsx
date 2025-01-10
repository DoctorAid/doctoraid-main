import React from 'react';
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation';

function SessionPatientList() {
  const patients = [
    { initials: 'DW', name: 'Denzel White', id: '200-01', time: '9.00 AM' },
    { initials: 'SM', name: 'Stacy Mitchell', id: '220-02', time: '9.15 AM'},
    { initials: 'AD', name: 'Amy Dunham', id: '254-02', time: '9.30 AM'},
    { initials: 'DJ', name: 'Demi Joan', id: '260-01', time: '9.50 AM'},
    { initials: 'SM', name: 'Susan Myers', id: '240-03', time: '10.15 AM'},
  ];

  return (
    <div className="w-full h-full flex flex-col items-start px-4 py-6 bg-white shadow-lg rounded-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Session's Patient List</h2>
      <ul className="w-full">
        {patients.map((patient) => (
          <li
            key={patient.id}
            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 mb-4 shadow-sm"
          >
            <div className="flex items-center ">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-semibold">
                {patient.initials}
              </div>
              <div className='ml-4'>
                <p className="text-base font-medium text-gray-800">{patient.name}</p>
                <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
              </div> 
            </div>
            <p className="text-sm font-medium text-gray-700">{patient.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full px-2 py-2 items-start justify-start text-black'>
      <DashboardNavigation />

      {/* Top Section */}
      <div className='flex justify-around gap-2 w-full h-[40%] bg-[#93b1ec] items-center px-1 py-1'>
        <div className='bg-[#b7f877] w-full h-full flex items-center justify-center'><p>Section 01</p></div>
        <div className='bg-[#3bcf3b] w-full h-full flex items-center justify-center'><p>Section 02</p></div>
      </div>

      {/* Bottom Section */}
      <div className='flex justify-around gap-2 w-full h-[60%] bg-[#93b1ec] items-center px-1 py-1'>

        {/* Sessions patient list section */}
        <div className='bg-white w-full h-full'>
          <SessionPatientList/>
        </div>





        <div className='bg-[#7da4f2] w-full h-full flex items-center justify-center'><p>Section 02</p></div>

        {/* Consultation History Section */}
        <div className='bg-white w-full h-full flex flex-col items-start px-6 py-4 shadow-md rounded-lg overflow-y-scroll'>
          <h2 className='text-lg font-semibold mb-4 text-black'>Consultation History</h2>

          {/* Consultation Item 1 */}
          <div className='w-full border-b-[1px] border-[#7da4f2] pb-3 mb-3'>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Last Checked</p>
              <p className='text-sm font-normal text-[#616161]'>
                10 Dec 2023 Prescription{' '}
                <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer'>
                #2241206
                </span>
              </p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Observation</p>
              <p className='text-sm font-normal text-[#616161]'>Fever, Fatigue</p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Prescription</p>
              <p className='text-sm font-normal text-[#616161]'>Paracetamol, Vitamin C</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-semibold w-28'>Note</p>
              <p className='text-sm font-normal text-[#616161]'>Rest and hydrate properly.</p>
            </div>
          </div>

          {/* Consultation Item 2 */}
          <div className='w-full border-b-[1px] border-[#7da4f2] pb-3 mb-3'>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Last Checked</p>
              <p className='text-sm font-normal text-[#616161]'>
                22 Nov 2023 Prescription{' '}
                <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer'>
                #2241206
                </span>
              </p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Observation</p>
              <p className='text-sm font-normal text-[#616161]'>Cough, Sore Throat</p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Prescription</p>
              <p className='text-sm font-normal text-[#616161]'>Cough Syrup, Warm Fluids</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-semibold w-28'>Note</p>
              <p className='text-sm font-normal text-[#616161]'>Avoid cold drinks and spicy food.</p>
            </div>
          </div>

          {/* Consultation Item 3 */}
          <div className='w-full border-b-[1px] border-[#7da4f2] pb-3 mb-3'>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Last Checked</p>
              <p className='text-sm font-normal text-[#616161]'>
                05 Oct 2023 Prescription{' '}
                <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer'>
                #2241206
                </span>
              </p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Observation</p>
              <p className='text-sm font-normal text-[#616161]'>Headache, Dizziness</p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Prescription</p>
              <p className='text-sm font-normal text-[#616161]'>Pain Reliever, Electrolytes</p>
            </div>
            <div className='flex'>
              <p className='text-sm font-semibold w-28'>Note</p>
              <p className='text-sm font-normal text-[#616161]'>Reduce screen time and stress.</p>
            </div>
          </div>

          {/* Consultation Item 4 */}
          <div className='w-full border-b-[1px] border-[#7da4f2] pb-3 mb-3'>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Last Checked</p>
              <p className='text-sm font-normal text-[#616161]'>
                12 Sep 2023 Prescription{' '}
                <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer'>
                #2241206
                </span>
              </p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Observation</p>
              <p className='text-sm font-normal text-[#616161]'>Allergy, Itching</p>
            </div>
            <div className='flex mb-3'>
              <p className='text-sm font-semibold w-28'>Prescription</p>
              <p className='text-sm font-normal text-[#616161]'>Antihistamines, Skin Cream</p>
            </div>
            <div className='flex items-start'>
              <p className='text-sm font-semibold w-28 flex-shrink-0'>Note</p>
              <p className='text-sm font-normal text-[#616161]'>Stretch regularly and avoid lifting heavy objects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
