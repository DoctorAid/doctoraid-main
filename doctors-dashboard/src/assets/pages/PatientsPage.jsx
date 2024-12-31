import React from 'react';

function PatientsPage() {
  return (
    <div className="flex bg-[#FAFAF9] w-full h-screen items-start justify-between text-black p-6 gap-4">
      {/* Placeholder for Session's Patient List */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <p>Session's List</p>
      </div>

      {/* Placeholder for On-going Section */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <p>On-going</p>
      </div>

      {/* Consultation History Section */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <p>Consultation History</p>
        
      </div>
    </div>
  );
}

export default PatientsPage;
