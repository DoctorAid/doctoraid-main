import React from 'react';
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk,UserButton,useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";


function SessionPatientList() {
  const patients = [
    { initials: 'DW', name: 'Denzel White', id: '200-01', time: '9.00 AM', timeColor: 'bg-blue-100 text-blue-700' },
    { initials: 'SM', name: 'Stacy Mitchell', id: '220-02', time: '9.15 AM', timeColor: 'bg-pink-100 text-pink-700'},
    { initials: 'AD', name: 'Amy Dunham', id: '254-02', time: '9.30 AM', timeColor: 'bg-purple-100 text-purple-700'},
    { initials: 'DJ', name: 'Demi Joan', id: '260-01', time: '9.50 AM', timeColor: 'bg-green-100 text-green-700'},
    { initials: 'SM', name: 'Susan Myers', id: '240-03', time: '10.15 AM', timeColor: 'bg-pink-100 text-pink-700'},
  ];

  return (
    <div className="w-full h-full flex flex-col items-start px-6 py-4 bg-white shadow-lg rounded-lg overflow-y-auto">
      <div className='flex justify-between w-full mb-4'>
        <h2 className="text-lg font-bold text-gray-900">Session's Patient List</h2>
        <p className='text-base font-medium text-gray-600 flex items-center gap-1 cursor-pointer'>
          Today <span className='transform rotate-270 text-sm relative -bottom-0.5'>&#9660;</span>
        </p>
      </div>
      

    
      <ul className="w-full space-y-4">
        {patients.map((patient) => (
          <li
            key={patient.id}
            className="flex justify-between items-center bg-gray-50  hover:bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 shadow-sm"
          >
            <div className="flex items-center ">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${patient.timeColor} text-lg font-semibold`}>
                {patient.initials}
              </div>
              <div className='ml-4'>
                <p className="text-base font-medium text-gray-800">{patient.name}</p>
                <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
              </div> 
            </div>
            <div className={` text-sm font-medium px-3 py-1 rounded-full ${patient.timeColor} bg-opacity-20`}>
              {patient.time}
            </div>
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
      <div className=" max-w-lg mx-auto space-y-6">
      {/* First Row: On-going Section and Timer */}
      <div className="grid grid-cols-2 gap-4 items-center text-center">
        {/* On-going Section */}
        <div className=" h-[175px] bg-[#C9E4F3] p-10 rounded-3xl ">
          <h5 className="text-lg font-semibold text-[25px]">On-going</h5>
          <br />
          <p className="text-gray-500 text-sm text-[20px]">Session ID</p>
          <p className="text-[#6394B5] font-bold text-lg text-[25px]">#2241206</p>
        </div>

        {/* Timer */}
        <div className="flex justify-center items-center">
          <div className="h-[175px] w-[250px] rounded-3xl bg-[#152945] text-white flex items-center justify-center text-xl font-bold">
          </div>
        </div>
      </div>

      {/* Second Row: Create a New Session */}
      <div className="flex justify-between items-center h-[90px] bg-[#FFFFFF] rounded-3xl pl-[15px]">
        <div>
          <p className="text-[#6394B5] text-[30px]">
            Left <span className="text-[#6394B5] font-bold text-[40px]">15</span>
          </p>
        </div>
        <button className=" text-[#6394B5] px-4 py-2 rounded-lg ">
          Create a New Session
          <Plus className="w-5 h-5 mr-2" />
        </button>
      </div>
    </div>

    <div className="bg-[#edefed] w-full h-full flex items-center justify-center">
      <div className="bg-blue-100 w-full  rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Waiting List */}
        <div className="flex-1">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 w-full text-left font-medium flex items-center">
            <span className="text-2xl mr-2">+</span> Create a New Session
          </button>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Waiting List</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">
              M
            </div>
            <div>
              <h3 className="font-medium">Sandith Silva</h3>
              <p className="text-sm text-gray-500">8 April, 2021 | 04:00 PM</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">
              M
            </div>
            <div>
              <h3 className="font-medium">Sandith Silva</h3>
              <p className="text-sm text-gray-500">8 April, 2021 | 04:00 PM</p>
            </div>
          </div>
        </div>

        {/* New Appointments */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">New Appointments</h2>
            <a href="#" className="text-blue-600 text-sm font-medium">View All</a>
          </div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">
                M
              </div>
              <div>
                <h3 className="font-medium">Monthly doctor’s meet</h3>
                <p className="text-sm text-gray-500">8 April, 2021 | 04:00 PM</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>

      {/* Bottom Section */}
      <div className='flex justify-around gap-2 w-full h-[60%] bg-[#93b1ec] items-center px-1 py-1'>
       

        {/* Sessions patient list section */}
        <div className='bg-white w-full h-full'>
          <SessionPatientList/>
        </div>





        <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto h-full">
  {/* On-going Header */}
  <h2 className="text-2xl font-bold mb-6">On-going</h2>

  {/* Patient Information */}
  <div className="flex items-center mb-6">
    {/* Profile Icon */}
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-500 mr-4">
      DW
    </div>
    {/* Patient Details */}
    <div>
      <h3 className="text-lg font-medium">Denzel White</h3>
      <p className="text-sm text-gray-500">Patient ID - 200 - 01</p>
    </div>
  </div>

  {/* Patient Stats */}
  <div className="text-sm space-y-2 mb-6">
    <p>
      <strong>Sex:</strong> Male
    </p>
    <p>
      <strong>Age:</strong> 28
    </p>
    <p>
      <strong>Blood:</strong> O+
    </p>
    <p>
      <strong>Allergies:</strong> Lorem ipsum dolor sit amet
    </p>
  </div>

  {/* Added Complaints */}
  <div>
    <h4 className="text-lg font-bold mb-2">Added Complaints</h4>
    <p className="text-sm text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.
    </p>
  </div>
</div>


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
