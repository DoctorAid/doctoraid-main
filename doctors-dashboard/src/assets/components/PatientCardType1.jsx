import React from "react";

const PatientCardType1 = ({ name, date, time }) => {
  return (
    <div className="flex items-center bg-blue-50 rounded-lg p-4 w-full max-w-sm">
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

export default PatientCardType1;
