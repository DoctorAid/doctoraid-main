import React from 'react';
import { useEffect, useState } from "react";
import { getSessionsByDoctor } from '../api/doctorsAPI';
import { useUser } from "@clerk/clerk-react";

const SessionList = ({ setSession }) => {
  const [sessionsData, setSessionsData] = useState([]);
  const [latestSession, setLatestSession] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  
  const { user } = useUser();
  const clerkId = user ? user.id : null;
   
 
  
  
  
  useEffect(() => {
    if (sessionsData.length > 0) {
      // Set latest session to the first one
      setLatestSession(sessionsData[0]);
      
      // Set upcoming sessions to all except the first one
      setUpcomingSessions(sessionsData.slice(1));
      
      console.log("Latest session:", sessionsData[0]);
      console.log("Upcoming sessions:", sessionsData.slice(1));
    }
  }, [sessionsData]);
  
  return (
    <div className="flex bg-gray-50 min-h-screen">
     
    </div>
  );
};

export default SessionList;