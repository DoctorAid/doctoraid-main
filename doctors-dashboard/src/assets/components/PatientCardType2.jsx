import React from 'react';

const PatientCardType2 = ({ id, name, time, code }) => {
  // Extract initials from the name
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
      {/* Circular placeholder with initials */}
      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold">
        {initials}
      </div>
      <div className="ml-4">
        <div className="text-sm font-semibold text-gray-700">{id}</div>
        <div className="text-lg font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{time}</div>
        <div className="text-sm text-gray-500">{code}</div>
      </div>
    </div>
  );
};

export default PatientCardType2;
