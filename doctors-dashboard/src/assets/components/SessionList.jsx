import React from 'react';
import { useEffect, useState } from "react";
import { getSessionsByDoctor } from '../api/doctorsAPI';
import { useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, PlusCircle, ArrowRight, ChevronRight } from 'lucide-react';

const SessionList = ({ setSession }) => {
  const [sessionsData, setSessionsData] = useState([]);
  const [latestSession, setLatestSession] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useUser();
  const clerkId = user ? user.id : null;
   
  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const data = await getSessionsByDoctor(clerkId);
      console.log("Sessions data fetched:", data);
      setSessionsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setIsLoading(false);
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

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#295567]"></div>
      </div>
    );
  }
  
  return (
    <div className="flex bg-[#FAFAF9] min-h-screen font-['Raleway',sans-serif] animate-pageTransition">
      {/* Left side with illustration */}
      <div className="w-2/5 flex items-center justify-center p-8">
        <div className="relative">
          <img
            src="/src/assets/images/img.png"
            alt="Data analyst with charts"
            className="w-96 h-auto"
          />
          <div className="absolute -bottom-4 -right-4 bg-[#295567] text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="text-sm font-medium">Manage your sessions efficiently</p>
          </div>
        </div>
      </div>
      
      {/* Right side with sessions information */}
      <div className="w-3/5 p-10 bg-white rounded-tl-3xl shadow-md">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Calendar className="mr-3 text-[#295567]" size={24} />
            Your Sessions
          </h1>
          
          {/* White container */}
          <div className="bg-[#FAFAF9] rounded-xl shadow-sm p-6">
            {/* Latest Session Section */}
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
              <CheckCircle className="mr-2 text-[#295567]" size={20} />
              Latest Session
            </h2>
            
            {latestSession ? (
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 transform transition-transform hover:scale-[1.01]">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center mb-2">
                      <p className="text-gray-700 font-semibold">Session ID: <span className="text-[#295567]">#{latestSession._id ? latestSession._id.slice(-6) : ""}</span></p>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={14} className="mr-1 text-[#295567]" />
                      <span className="mr-3">{formatDate(latestSession.date)}</span>
                      <Clock size={14} className="mr-1 text-[#295567]" />
                      <span>{latestSession.time || ""}</span>
                    </div>
                  </div>
                  <button 
                    className="bg-gradient-to-r from-[#295567] to-[#295567]/80 hover:from-[#295567]/90 hover:to-[#295567] text-white font-medium px-5 py-2 rounded-lg transition shadow-sm flex items-center"
                    onClick={() => setSession( latestSession._id )}
                  >
                    <span>Start</span>
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-4 mb-6 text-center text-gray-500 shadow-sm border border-gray-100">
                No latest session available
              </div>
            )}
            
            {/* Upcoming Sessions Section */}
            <h2 className="text-lg font-bold text-gray-700 mb-4 mt-6 flex items-center">
              <Clock className="mr-2 text-[#295567]" size={20} />
              Upcoming Sessions
            </h2>
            
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session, index) => (
                  <div 
                    key={session._id} 
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 transform transition-transform hover:scale-[1.01]"
                    style={{
                      animationName: 'fadeIn',
                      animationDuration: '0.5s',
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center mb-2">
                          <p className="text-gray-700 font-semibold">Session ID: <span className="text-[#295567]">#{session._id ? session._id.slice(-6) : ""}</span></p>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar size={14} className="mr-1 text-[#295567]" />
                          <span className="mr-3">{formatDate(session.date)}</span>
                          <Clock size={14} className="mr-1 text-[#295567]" />
                          <span>{session.time || ""}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-4 text-center text-gray-500 shadow-sm border border-gray-100">
                  No upcoming sessions available
                </div>
              )}
            </div>
            
            {/* Create New Session Button */}
            <Link to='../schedule' className="block mt-8">
              <button 
                className="w-full bg-gradient-to-r from-[#295567] to-[#295567]/80 hover:from-[#295567]/90 hover:to-[#295567] text-white font-medium py-3 rounded-lg transition shadow-sm flex items-center justify-center"
              >
                <PlusCircle size={18} className="mr-2" />
                Create New Session
              </button>
            </Link>  
          </div>
        </div>
      </div>

      {/* Custom Scrollbar and Animations */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pageTransition {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SessionList;