import React from "react";

function PatientListComponent({ patients }) {
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
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Get initial colors based on name
  const getAvatarColor = (initials) => {
    const colors = {
      'DW': 'bg-[#E2F1FB] text-[#5B89A6] border-[#A7D1EF]',
      'SM': 'bg-[#FFE2E5] text-[#FF6B81] border-[#FFBAC5]',
      'AD': 'bg-[#E6E6FA] text-[#6A5ACD] border-[#B8B2E5]',
      'DJ': 'bg-[#E2F1FB] text-[#5B89A6] border-[#A7D1EF]',
    };
    return colors[initials] || 'bg-[#FFE2E5] text-[#FF6B81] border-[#FFBAC5]';
  };

  // Calculate today's date in format similar to the image
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <h2 className="font-medium text-2xl text-gray-800">Session's Patient List</h2>
        <div className="flex items-center">
          <span className="text-gray-600">{today}</span>
          <svg className="w-5 h-5 ml-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
     
      <div className="max-h-[330px] overflow-y-auto p-4 space-y-4">
        {sessionPatients.length > 0 ? (
          sessionPatients.map((patient, index) => {
            const patientInitials = patient.initials || getInitials(patient.name);
            return (
              <div key={index} className="flex justify-between items-center px-4 py-3 rounded-xl">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${getAvatarColor(patientInitials)}`}>
                    {patientInitials}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-blue-600">{patient.code || patient.patientId}</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {patient.time}
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