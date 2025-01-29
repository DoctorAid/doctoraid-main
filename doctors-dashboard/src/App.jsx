import React from 'react';
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk,UserButton,useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function App() {

  const WaitingList = () => {
    const items = [
      { name: "Sandith Silva", date: "8 April, 2021", time: "04.00 PM"},
      { name: "John Doe", date: "8 April, 2021", time: "04.15 PM"},
      { name: "Jane Smith", date: "8 April, 2021", time: "04.30 PM"},
    ];

    return (
      <div className='w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col'>
        <h2 className='text-xl font-semibold mb-4'>Waiting List</h2>
        <div className='space-y-2 overflow-y-auto flex-1'>
          {items.map((item,index) => (
            <div
              key={index}
              className={`flex items-center p-4 bg-blue-50 rounded-lg shadow-sm ${
                index === 0 ? "border-2 border-blue-500" : ""
              }`}
            >
              <div className='flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full text-lg font-bold text-gray-700'>
                M
              </div>
              <div className='ml-4'>
                <p className='font-medium text-gray-800'>{item.name}</p>
                <p className='text-sm text-gray-500'>
                  {item.date} | {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };



  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full px-2 py-2 items-start justify-start text-black'>
      <DashboardNavigation />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full ">
          <div className="space-y-4 col-span-1">
            {/* Small Section 1 */}
            <div className="bg-blue-200 p-6 rounded-xl shadow-md h-40 flex items-center justify-center">
              Section 1
            </div>
            {/* Small Section 2 */}
            <div className="bg-blue-200 p-6 rounded-xl shadow-md h-60 flex items-center justify-center">
              <WaitingList />
            </div>
            {/* Small Section 3 */}
            <div className="bg-blue-200 p-6 rounded-xl shadow-md h-80 flex items-center justify-center">
              Section 3
            </div>
          </div>
          {/* Large Section */}
          <div className="bg-white p-6 rounded-xl shadow-md col-span-2 h-full">
          {/* First Row: Patient Details & Consultation History */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* On-going Patient Details */}
        <div>
          <h3 className="text-xl font-semibold">On-going - Patient Details</h3>
          <div className="mt-4 p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
          <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">DW</div>
          <div>
            <h4 className="text-lg font-semibold">Denzel White</h4>
            <p className="text-gray-500">Patient ID - 200 - 01</p>
          </div>
        </div>
        <p className="mt-2"><strong>Sex:</strong> Male</p>
        <p><strong>Age:</strong> 28</p>
        <p><strong>Blood:</strong> O+</p>
        <p className="text-gray-500">Allergies: None</p>
        <p className="text-gray-500 mt-2">Added Complaints: Lorem ipsum dolor sit amet...</p>
      </div>
    </div>
    {/* Consultation History */}
    <div>
      <h3 className="text-xl font-semibold">Consultation History</h3>
      <div className="mt-4 p-4 border rounded-lg">
        <p><strong>Last Checked:</strong> 21 April 2021 Prescription <a href="#" className="text-blue-600">#2J983KT0</a></p>
        <p><strong>Observation:</strong> High fever and cough at normal hemoglobin levels.</p>
        <p><strong>Prescription:</strong> Paracetamol - 2 times a day, Diazepam - Day and Night before meal.</p>
        <p className="text-gray-500">Note: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
      <div className="flex justify-end mt-2">
        <button className="p-2"><ChevronLeft className="w-6 h-6" /></button>
        <button className="p-2"><ChevronRight className="w-6 h-6" /></button>
      </div>
    </div>
  </div>

  {/* Second Row: User Inputs */}
  <div className="mt-6">
    <h3 className="text-xl font-semibold">On-going</h3>
    <form className="mt-4 space-y-4">
      <div>
        <label className="font-medium">Observation:</label>
        <textarea className="w-full p-2 border rounded-md" rows="2"></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Prescription:</label>
          <textarea className="w-full p-2 border rounded-md" rows="4"></textarea>
        </div>
        <div>
          <label className="font-medium">Note:</label>
          <textarea className="w-full p-2 border rounded-md" rows="4"></textarea>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button className="bg-gray-300 px-6 py-2 rounded-md">Save</button>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Next</button>
      </div>
    </form>
  </div>
</div>
        </div>
        </div>
   
  );
}

export default App;
