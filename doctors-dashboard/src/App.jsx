import React from 'react';
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk,UserButton,useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";


function App() {

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
              Section 2
            </div>
            {/* Small Section 3 */}
            <div className="bg-blue-200 p-6 rounded-xl shadow-md h-80 flex items-center justify-center">
              Section 3
            </div>
          </div>
          {/* Large Section */}
          <div className="bg-blue-200 p-6 rounded-xl shadow-md col-span-2 h-full flex items-center justify-center">
            Section 4
          </div>
        </div>
    </div>
  );
}

export default App;
