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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="px-3 py-2 border-b border-gray-100">
        <h2 className="font-medium text-sm text-gray-800">Session's Patient List</h2>
      </div>
     
      <div className="overflow-y-auto p-2 space-y-1.5 h-[calc(100%-40px)]">
        {sessionPatients && sessionPatients.length > 0 ? (
          sessionPatients.map((patient, index) => {
            // Extract the patient name with proper fallbacks
            const patientName = patient.patientName || patient.name || "Unknown";
           
            // Get the start time with fallbacks
            const startTime = patient.startTime || patient.time || "N/A";
            
            // Get initials from patient name
            const patientInitials = getInitials(patientName);
           
            return (
              <div key={index} className="flex justify-between items-center p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#295567]/10 text-[#295567] text-xs font-medium">
                    {patientInitials}
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <h3 className="font-medium text-xs text-gray-800 truncate">{patientName}</h3>
                  </div>
                </div>
                <div className="min-w-[55px] text-center px-2 py-0.5 bg-[#295567]/10 text-[#295567] rounded-md text-xs font-medium">
                  {startTime}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 text-gray-500 text-xs">
            No patients in current session
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientListComponent;