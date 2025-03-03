import React from 'react';
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk,UserButton,useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PatientCardType1 from './assets/components/PatientCardType1';
import PatientCardType2 from './assets/components/PatientCardType2';
import SessionInfo from './assets/components/SessionInfo';
import PatientDetailsCardType1 from './assets/components/PatientDetailsCardType1';

function App() {

  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full px-2 py-2 items-start justify-start text-black'>
      <DashboardNavigation />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full ">
          <div className="space-y-4 col-span-1">
            {/* Small Section 1 */}
            <div className=" pr-2 pl-2 h-30">
            <SessionInfo/>
            </div>
            {/* Small Section 2 */}
            <div className="h-70 pr-2">
            <div className="font-[500] text-[1.5rem] pl-5 text-gray-800">
              Waiting List
            </div>
            <PatientCardType1/>
            </div>
            {/* Small Section 3 */}
            <div className="h-100 pr-2">
            <div className="font-[500] text-[1.5rem] pl-5 text-gray-800">
              Session’s Patient List
            </div>
            <PatientCardType2/>
            </div>
          </div>
          {/* Large Section */}
          <div className="col-span-2 h-full">
            <PatientDetailsCardType1 />
          </div>
      </div>
    </div> 
   
  );
}

export default App;
