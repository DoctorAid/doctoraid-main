import React from 'react';
import { useEffect, useState } from "react";
import { getSessionsByDoctor } from '../api/doctorsAPI';
import { useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const SessionList = ({ setSession }) => {
  const [sessionsData, setSessionsData] = useState([]);
  const [latestSession, setLatestSession] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  
  const { user } = useUser();
  const clerkId = user ? user.id : null;
   
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
  }, [clerkId]);
  
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
          
          {latestSession ? (
            <div className="bg-blue-50 rounded-xl p-4 mb-8 flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">ID: #{latestSession._id ? latestSession._id.slice(-6) : ""}</p>
                <p className="text-gray-500 text-sm">
                  {latestSession.date ? latestSession.date.split('T')[0] : ""} {latestSession.time || ""}
                </p>
              </div>
              <button 
                className="bg-green-200 hover:bg-green-300 text-green-800 font-medium px-8 py-2 rounded-full transition"
                onClick={() => setSession( latestSession._id )}
              >
                Start
              </button>
            </div>
          ) : (
            <p>No latest session available</p>
          )}
          
          {/* Upcoming Sessions Section */}
          <h2 className="text-xl font-bold text-slate-700 mb-4">Upcoming Sessions</h2>
          
          <div className="space-y-3 mb-8 max-h-64 overflow-y-auto pr-2">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div key={session._id} className="bg-blue-50 rounded-xl p-4">
                  <p className="text-gray-700 font-medium">ID: #{session._id ? session._id.slice(-6) : ""}</p>
                  <p className="text-gray-500 text-sm">
                    {session.date ? session.date.split('T')[0] : ""} | {session.time || ""}
                  </p>
                </div>
              ))
            ) : (
              <p>No upcoming sessions available</p>
            )}
          </div>
          
          {/* Create New Session Button */}
          <Link to='../schedule' className="mr-1">
          <button 
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition flex items-center justify-center"
          >
            +Create New Session
          </button></Link>  
        </div>
      </div>
    </div>
  );
};

export default SessionList;