import React from "react";

const patients = [
  { name: "Denzel White", date: "2024-02-01", time: "09:00 AM" },
  { name: "Stacy Mitchell", date: "2024-02-01", time: "09:15 AM" },
  { name: "Amy Dunham", date: "2024-02-01", time: "09:30 AM" },
  { name: "Demi Joan", date: "2024-02-01", time: "09:50 AM" },
  { name: "Susan Myers", date: "2024-02-01", time: "10:15 AM" },
];

const PatientCardType1 = ({ name, date, time }) => {
  return (
    <div className="flex items-center bg-blue-50 rounded-lg p-4 w-full max-w-sm h-[80px]">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full text-lg font-bold text-blue-600">
        {name[0]}
      </div>
      <div className="ml-4">
        <h3 className="text-gray-800 font-semibold text-lg">{name}</h3>
        <p className="text-gray-500 text-sm">
          {date} <span className="mx-2">|</span> {time}
        </p>
      </div>
    </div>
  );
};

const PatientList = () => {
  return (
    <div className="max-h-[220px] overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
      {patients.map((patient, index) => (
        <PatientCardType1 key={index} {...patient} />
      ))}
    </div>
  );
};

export default PatientList;
