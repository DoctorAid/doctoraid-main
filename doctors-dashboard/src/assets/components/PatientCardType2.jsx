import React, { useState } from "react";

const patients = [
  { name: "Denzel White", time: "9:00 AM", code: "200 - 01" },
  { name: "Stacy Mitchell", time: "9:15 AM", code: "220 - 02" },
  { name: "Amy Dunham", time: "9:30 AM", code: "254 - 02" },
  { name: "Demi Joan", time: "9:50 AM", code: "260 - 01" },
  { name: "Susan Myers", time: "10:15 AM", code: "240 - 03" }, 
];

const PatientCardType2 = ({ name, time, code, isActive, onClick }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer h-[80px] ${
        isActive ? "bg-[#EAF4F4] shadow-lg" : "bg-white"
      }`}
      onClick={onClick}
    >
      {/* Circular Avatar */}
      <div className="flex items-center">
        <div
          className="flex items-center justify-center h-12 w-12 rounded-full border-2 text-black font-bold"
          style={{
            borderColor: isActive ? "#A7D2D2" : "#6A8FC7",
            backgroundColor: isActive ? "#D8ECEC" : "transparent",
          }}
        >
          {initials}
        </div>
        <div className="ml-4">
          <div className="text-black font-bold text-lg">{name}</div>
          <div className="text-sm text-[#6A8FC7]">{code}</div>
        </div>
      </div>

      {/* Time */}
      <div
        className="px-3 py-1 rounded-lg text-sm font-semibold"
        style={{
          backgroundColor: isActive ? "#A7D2D2" : "#6A8FC7",
          color: "#fff",
        }}
      >
        {time}
      </div>
    </div>
  );
};

const PatientList = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const cardHeight = 90; // Each card height
  const visibleCards = 3; // Show exactly 3 cards
  const containerHeight = cardHeight * visibleCards + 16 * (visibleCards - 1); // Includes spacing

  return (
    <div className="relative mx-auto ">
      {/* Adjusted Scrollable Container */}
      <div
        className="overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
        style={{ height: `${containerHeight}px` }} // Dynamic height
      >
        {patients.map((patient, index) => (
          <PatientCardType2
            key={index}
            {...patient}
            isActive={selectedPatient === index}
            onClick={() => setSelectedPatient(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
