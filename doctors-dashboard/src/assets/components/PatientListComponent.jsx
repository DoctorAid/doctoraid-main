import React from "react";

function PatientListComponent({ patients }) {
  console.log("PatientListComponent received patients:", patients);
 
  // Session patients data - use passed in data or fallback to mock data
  const sessionPatients = patients || [
    { name: "Denzel White", time: "9:00 AM", code: "200 - 01", initials: "DW" },
    { name: "Stacy Mitchell", time: "9:15 AM", code: "220 - 02", initials: "SM" },
    { name: "Amy Dunham", time: "9:30 AM", code: "254 - 02", initials: "AD" },
    { name: "Demi Joan", time: "9:50 AM", code: "260 - 01", initials: "DJ" },
    { name: "Susan Myers", time: "10:15 AM", code: "240 - 03", initials: "SM" },
  ];

  // Get avatar initials from name if not provided
  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "U";
   
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Calculate today's date in format similar to the image
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <h2 className="font-medium text-xl text-gray-800">Session's Patient List</h2>
        <div className="flex items-center">
          <span className="text-gray-600 text-sm">{today}</span>
          <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
     
      <div className="max-h-[330px] overflow-y-auto p-4 space-y-2">
        {sessionPatients && sessionPatients.length > 0 ? (
          sessionPatients.map((patient, index) => {
            // Extract the patient name with proper fallbacks
            const patientName = patient.patientName || patient.name || "Unknown";
           
            // Get the start time with fallbacks
            const startTime = patient.startTime || patient.time || "N/A";
            
            // Get initials from patient name
            const patientInitials = getInitials(patientName);
           
            return (
              <div key={index} className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#295567]/10 text-[#295567] text-sm font-medium">
                    {patientInitials}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">{patientName}</h3>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#295567]/10 text-[#295567] rounded-full text-xs font-medium">
                  {startTime}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-gray-500">
            No patients in current session
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientListComponent;