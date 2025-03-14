import { LogOut } from 'lucide-react';
import React from 'react'
import NavigationTabs from './NavigationTabs';

import { useNavigate } from "react-router-dom";
import { useClerk,useUser,useAuth } from "@clerk/clerk-react";
import { UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';

function Navigation() {

  const { signOut } = useClerk();
  const navigate = useNavigate();
  const {user} = useUser();
  const { isSignedIn, isLoaded } = useAuth(); 
  console.log("Navigation loaded")


  useEffect(() => {
    
      if (!isSignedIn) {
        navigate("/"); // Redirect if signed in
      } 
    
  }, [isSignedIn,navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
  
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  if (!isSignedIn) {
    return null;
  }


  return (
    <div className='rounded-l-[30px] bg-[#FAFAF9] h-[100%] animate-[pop_0.3s_ease-out]'> 
     <div className="flex flex-col w-[16.625rem] h-[100%] py-8 gap-20 bg-[#295567] rounded-[30px]">

        
        <div className='flex flex-col items-center justify-center'>
          <div className="flex items-center absolute">
            <img src="/Images/logo.png" className="w-full h-full object-cover" />
          </div>
        </div>

        
          <div className='flex flex-col gap-2 justify-center items-center'>
            <div className="w-[179px] h-[179px] bg-[#c4c4c4] rounded-full overflow-hidden">
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className='font-semibold text-yellow-50'>
              <p>Dr.{user.firstName} {user.lastName}</p>
            </div>
          </div>
        
          
        

        <NavigationTabs/>

        <div className='flex items-center text-white justify-center'>
          <div className='flex justify-between gap-2 cursor-pointer ' onClick={handleSignOut}>
            
              <LogOut/>
            
            Log Out
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navigation
