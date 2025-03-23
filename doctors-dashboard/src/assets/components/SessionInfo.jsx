import React from 'react';

const SessionInfo = (props) => {
  return (
    <div className="flex items-center justify-between bg-[#CFE6F5] rounded-3xl p-5 w-full max-w-md">
      {/* Left Section: Session ID and Pin in a vertical stack */}
      <div className="flex flex-col">
        {/* Session ID */}
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-800">Session ID</p>
          <p className="text-xl font-bold text-[#5B89A6]">#{props.SessionId}</p>
        </div>
        
        {/* Session Pin */}
        <div>
          <p className="text-sm font-semibold text-gray-800">Session Pin</p>
          <p className="text-lg font-bold text-[#5B89A6]">{props.SessionPin || 'N/A'}</p>
        </div>
      </div>

      {/* Right Section: Slots count with circular indicators */}
      <div className="flex items-center gap-4">
        {/* Left slots */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
            <p className="text-2xl font-bold text-[#5B89A6]">{props.bookedSlots}</p>
          </div>
          <p className="text-xs font-medium text-[#5B89A6] mt-1">Left</p>
        </div>
        
        {/* Total slots */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm border-2 border-[#2E5D78]/20">
            <p className="text-3xl font-bold text-[#2E5D78]">{props.totalSlots}</p>
          </div>
          <p className="text-xs font-medium text-[#2E5D78] mt-1">Total</p>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;