import React from 'react';

const sessionData = [
  { sessionId: "2241206", left: 15, total: 20 },
];

const SessionInfo = () => {
  return (
    <div className="flex items-center justify-between bg-[#CFE6F5] rounded-3xl p-6 w-full max-w-md">
      {/* Left Section: Session ID */}
      <div>
        <p className="text-lg font-semibold text-gray-900">Session ID</p>
        <p className="text-2xl font-bold text-[#5B89A6]">#{sessionData[0].sessionId}</p>
      </div>

      {/* Right Section: Left & Total */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-md font-medium text-[#5B89A6]">Left</p>
          <p className="text-3xl font-bold text-[#5B89A6]">{sessionData[0].left}</p>
        </div>
        <div className="text-center">
          <p className="text-md font-medium text-[#2E5D78]">Total</p>
          <p className="text-4xl font-extrabold text-[#2E5D78]">{sessionData[0].total}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
