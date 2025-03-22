import React from 'react';
import { useEffect ,useState} from "react";
import { getSessionsByDoctor } from '../api/doctorsAPI';
import {useUser} from "@clerk/clerk-react";

const MedicinesPage = ({setSession}) => {


  const [sessionsData, setSessionsData] = useState([]);
  const[latestSession, setLatestSession] = useState([]);

  const { user } = useUser();
  

  const clerkId = user ? user.id : null;
  console.log("clerkId is:", clerkId);

  const fetchSessions = async () => {
    try {
      const data = await getSessionsByDoctor(clerkId);
      
      console.log("Sessions data fetched:", data);
      setSessionsData(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };
    
  useEffect(() => {
    fetchSessions();
  }, []);


  useEffect(() => {
    if (sessionsData.length > 0) {
      setLatestSession(sessionsData[0]);
      console.log("Latest session:", sessionsData[0]);
    }
  }, [sessionsData]); 


  // Sample sessions data array
  const sessions = [
    {
      id: '#2241206',
      date: '8 April, 2021',
      time: '04:00 PM',
      type: 'latest'
    },
    {
      id: '#2241207',
      date: '8 April, 2021',
      time: '04:00 PM',
      type: 'upcoming'
    },
    {
      id: '#2241208',
      date: '8 April, 2021',
      time: '04:00 PM',
      type: 'upcoming'
    }
  ];

  
  const upcomingSessions = sessions.filter(session => session.type === 'upcoming');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Left side with illustration */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="relative">
          <img 
            src="/src/assets/images/img.png" 
            alt="Data analyst with charts" 
            className="w-96 h-auto"
          />
        </div>
      </div>

      {/* Right side with sessions information */}
      <div className="w-1/2 p-10">
        <h1 className="text-3xl font-bold text-slate-700 mb-8">Your Sessions</h1>
        
        {/* White container */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Latest Session Section */}
          <h2 className="text-xl font-bold text-slate-700 mb-4">Latest Session</h2>
          
          {latestSession && latestSession._id ? (
            <div className="bg-blue-50 rounded-xl p-4 mb-8 flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">ID: #{latestSession._id.slice(-6)||""}</p>
                <p className="text-gray-500 text-sm">{latestSession.date.split('T')[0] ||""} {latestSession.time}</p>
              </div>
              <button className="bg-green-200 hover:bg-green-300 text-green-800 font-medium px-8 py-2 rounded-full transition"
               onClick={() => 
                setSession({ _id: "someId" })}>
                Start
              </button>
            </div>
          ):(
            <p>No latest session available</p>
          )}
          
          {/* Upcoming Sessions Section */}
          <h2 className="text-xl font-bold text-slate-700 mb-4">Upcoming Session</h2>
          
          <div className="space-y-3 mb-8">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-blue-50 rounded-xl p-4">
                <p className="text-gray-700 font-medium">ID: {session.id}</p>
                <p className="text-gray-500 text-sm">{session.date} | {session.time}</p>
              </div>
            ))}
          </div>
          
          {/* Create New Session Button */}
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition flex items-center justify-center"
           >
            <span className="mr-1">+</span> Create the New Session
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicinesPage;