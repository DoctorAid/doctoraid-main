import React from "react";

function PatientListComponent() {
  // Session patients data
  const sessionPatients = [
    { name: "Denzel White", time: "9:00 AM", code: "200 - 01" },
    { name: "Stacy Mitchell", time: "9:15 AM", code: "220 - 02" },
    { name: "Amy Dunham", time: "9:30 AM", code: "254 - 02" },
    { name: "Demi Joan", time: "9:50 AM", code: "260 - 01" },
    { name: "Susan Myers", time: "10:15 AM", code: "240 - 03" },
  ];

  // Card height and visible cards calculation for styling
  const cardHeight = 90; // Each card height
  const visibleCards = 3; // Show exactly 3 cards
  const containerHeight = cardHeight * visibleCards + 16 * (visibleCards - 1); // Includes spacing

  return (
    <div className="h-100 rounded-[20px] bg-white shadow-md pr-2">
      <div className="font-[500] text-[1.5rem] pl-5 pt-4 text-gray-800">
        Session's Patient List
      </div>
      <div className="relative mx-auto">
        {/* Scrollable Container */}
        <div
          className="overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
          style={{ height: `${containerHeight}px` }} // Dynamic height
        >
          {sessionPatients.map((patient, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-2xl h-[80px] bg-white"
            >
              {/* Circular Avatar */}
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-[#6A8FC7] text-black font-bold"
                >
                  {patient.name.split(" ").map((part) => part[0]).join("").toUpperCase()}
                </div>
                <div className="ml-4">
                  <div className="text-black font-bold text-lg">{patient.name}</div>
                  <div className="text-sm text-[#6A8FC7]">{patient.code}</div>
                </div>
              </div>
              {/* Time */}
              <div
                className="px-3 py-1 rounded-lg text-sm font-semibold bg-[#6A8FC7] text-white"
              >
                {patient.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientListComponent;