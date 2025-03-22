import { LogOut, Layout, Calendar, Users, Settings, Pill } from 'lucide-react';
import React from 'react'
import NavigationTabs from './NavigationTabs';

import { useNavigate } from "react-router-dom";
import { useClerk, useUser, useAuth } from "@clerk/clerk-react";
import { UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';

function Navigation() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth(); 
  
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/"); // Redirect if not signed in
    } 
  }, [isSignedIn, navigate]);

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
    <div className='h-full bg-[#FAFAF9] transition-all duration-300 font-["Raleway",sans-serif]'>
      <div className="flex flex-col w-64 h-full py-6 bg-[#295567] rounded-r-2xl shadow-lg">
        {/* Logo */}
        <div className='flex justify-center mb-5 animate-[fadeIn_0.8s_ease-in-out]'>
          <div className="relative w-28">
            <img src="/Images/logo.png" className="w-full object-contain" alt="Logo" />
          </div>
        </div>
        
        {/* Profile */}
        <div className='flex flex-col items-center mb-6 animate-[slideDown_0.5s_ease-out]'>
          <div className="w-24 h-24 bg-[#c4c4c4] rounded-full overflow-hidden shadow-md mb-2 border-2 border-[#FAFAF9]/20 hover:border-[#FAFAF9]/60 transition-all duration-300">
            <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className='font-medium text-white text-center tracking-wide mt-1'>
            <p>Dr. {user.firstName} {user.lastName}</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className='flex-1'>
          <NavigationTabs />
        </div>
a
        {/* Logout Button */}
        <div className='px-6 mt-4 animate-[fadeIn_1s_ease-in-out]'>
          <button 
            className='flex items-center gap-2 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 w-full justify-center hover:translate-y-[-2px] group'
            onClick={handleSignOut}
          >
            <LogOut size={16} className="group-hover:rotate-12 transition-transform duration-300"/>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navigation