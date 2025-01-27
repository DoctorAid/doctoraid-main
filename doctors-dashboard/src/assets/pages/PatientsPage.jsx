import React, { useState } from "react";

const PatientsTable = () => {
  const patients = Array(500)
    .fill()
    .map((_, index) => ({
      name: `Patient ${index + 1}`,
      email: `example${index + 1}@email.com`,
      lastLogin: "14/APR/2020",
    }));

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  const totalPages = Math.ceil(patients.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPatients = patients.slice(startIndex, startIndex + rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Main Table Section */}
      <div className="flex justify-center items-center flex-grow">
        <div className="w-[800px] bg-white shadow-md rounded-md overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-[#FAFAF9]">
            <div className="flex space-x-4">
              <button className="font-medium text-blue-600 border-b-2 border-blue-600">
                All
              </button>
              <button className="font-medium text-gray-600 hover:text-blue-600">
                Booked
              </button>
              <button className="font-medium text-gray-600 hover:text-blue-600">
                Special
              </button>
            </div>
            <span className="text-sm text-gray-500">Total Patients: 500</span>
          </div>

          {/* Filter and Search Section */}
          <div className="px-6 py-4 flex items-center space-x-4 border-b border-gray-200 bg-gray-50">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md">
              Filter
            </button>
            <input
              type="text"
              placeholder="Search Users by Name, Email or Date"
              className="flex-1 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              + ADD
            </button>
          </div>

          {/* Table Section */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F2F6FA]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  USER STATUS
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPatients.map((patient, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>
                      {patient.email}
                      <div className="text-xs text-gray-400">
                        Last login: {patient.lastLogin}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline">
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 bg-gray-50">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-400"
                  : "text-blue-600 hover:underline"
              }`}
            >
              &lt;
            </button>
            <span className="text-sm text-gray-500">
              {startIndex + 1}-
              {Math.min(startIndex + rowsPerPage, patients.length)} of{" "}
              {patients.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-400"
                  : "text-blue-600 hover:underline"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Patient Details Section */}
      <div className="w-[500px] bg-white shadow-md rounded-md h-full flex-shrink-0">
        {/* Header */}
        <div className="bg-[#F2F6FA] px-6 py-4 border-b border-gray-200 flex items-center">
          <div className="h-12 w-12 flex justify-center items-center bg-gray-200 rounded-full text-lg font-medium text-gray-700">
            DW
          </div>
          <div className="ml-4">
            <h1 className="text-lg font-semibold text-gray-700">Denzel White</h1>
            <p className="text-sm text-gray-500">Patient ID - 200 - 01</p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="p-6 space-y-4">
          <div className="text-sm space-y-1">
            <p><strong>Sex:</strong> Male</p>
            <p><strong>Age:</strong> 28</p>
            <p><strong>Blood:</strong> O+</p>
            <p><strong>Allergies:</strong> Penicillin, Dust mites, Pollen</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Date - 2024-11-21</h2>
            <hr className="my-2 border-gray-300" />
            <p className="text-sm"><strong>Added Complaints:</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Persistent headache for the past three days, unresponsive to over-the-counter painkillers.</li>
              <li>Mild shortness of breath during physical activity, not experienced before.</li>
              <li>Occasional dizziness, especially after standing up quickly.</li>
              <li>Reports of nausea, especially in the morning, though no vomiting.</li>
              <li>Fatigue and general weakness throughout the day, impacting daily activities.</li>
            </ul>
            <hr className="my-2 border-gray-300" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Last Checked</h2>
            <p className="text-sm">21 April 2024 Prescription <a href="#" className="text-blue-600 hover:underline">#24J83KT0</a></p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Observation</h2>
            <p className="text-sm">High fever and cough at normal hemoglobin levels.</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Prescription</h2>
            <p className="text-sm">Paracetamol - 2 times a day<br />Wikoryl - Day and Night before meal</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Note</h2>
            <p className="text-sm">Patient has a history of seasonal allergies and sensitivity to certain medications. Recommend avoiding exposure to allergens such as dust and pollen. Follow-up is needed to monitor recurring symptoms and adjust treatment accordingly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsTable;
