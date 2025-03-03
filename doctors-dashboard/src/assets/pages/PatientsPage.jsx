import React, { useState,useEffect } from "react";
import { use } from "react";

const PatientsTable = () => {
  // const patients = Array(500)
  //   .fill()
  //   .map((_, index) => ({
  //     name: `Patient ${index + 1}`,
  //     email: `example${index + 1}@email.com`,
  //     lastLogin: "14/APR/2020",
  //   }));

  const patients =  [
    {
      "name": "Denzel White",
      "patient_id": "200-01",
      "sex": "Male",
      "age": 28,
      "blood_type": "O+",
      "allergies": ["Penicillin", "Dust mites", "Pollen"],
      "date": "2024-11-21",
      "email": "xxxxx@yahoo.com",
      "note": "Patient has a history of seasonal allergies and penicillin sensitivity. Advise caution with antibiotic prescriptions and recommend minimizing exposure to dust and pollen to prevent flare-ups."
    },
    {
      "name": "Alice Johnson",
      "patient_id": "200-02",
      "sex": "Female",
      "age": 34,
      "blood_type": "A-",
      "allergies": ["Peanuts", "Latex"],
      "date": "2024-11-22",
      "email": "alice.johnson@example.com",
      "note": "Patient has a severe peanut allergy and latex sensitivity. Recommend carrying an epinephrine auto-injector and avoiding latex-based medical equipment."
    },
    {
      "name": "Michael Smith",
      "patient_id": "200-03",
      "sex": "Male",
      "age": 45,
      "blood_type": "B+",
      "allergies": ["Shellfish", "Dust"],
      "date": "2024-11-23",
      "email": "michael.smith@example.com",
      "note": "Patient has a shellfish allergy. Recommend avoiding seafood and cross-contaminated food. Dust exposure should also be minimized to prevent respiratory issues."
    },
    {
      "name": "Sarah Adams",
      "patient_id": "200-04",
      "sex": "Female",
      "age": 29,
      "blood_type": "AB+",
      "allergies": ["None"],
      "date": "2024-11-24",
      "email": "sarah.adams@example.com",
      "note": "Patient has no known allergies. Regular check-ups recommended to monitor overall health."
    },
    {
      "name": "John Doe",
      "patient_id": "200-05",
      "sex": "Male",
      "age": 39,
      "blood_type": "O-",
      "allergies": ["Pollen"],
      "date": "2024-11-25",
      "email": "john.doe@example.com",
      "note": "Patient experiences seasonal allergies due to pollen exposure. Recommend antihistamines during allergy season and limiting outdoor activities on high pollen days."
    },
    {
      "name": "Emily Carter",
      "patient_id": "200-06",
      "sex": "Female",
      "age": 31,
      "blood_type": "A+",
      "allergies": ["Dairy"],
      "date": "2024-11-26",
      "email": "emily.carter@example.com",
      "note": "Patient is lactose intolerant. Recommend a dairy-free diet and use of lactase supplements as needed."
    },
    {
      "name": "Robert Brown",
      "patient_id": "200-07",
      "sex": "Male",
      "age": 50,
      "blood_type": "B-",
      "allergies": ["Soy", "Gluten"],
      "date": "2024-11-27",
      "email": "robert.brown@example.com",
      "note": "Patient has dietary restrictions due to soy and gluten allergies. Recommend a monitored diet and avoiding processed foods that may contain allergens."
    },
    {
      "name": "Laura Wilson",
      "patient_id": "200-08",
      "sex": "Female",
      "age": 27,
      "blood_type": "AB-",
      "allergies": ["Eggs"],
      "date": "2024-11-28",
      "email": "laura.wilson@example.com",
      "note": "Patient has an egg allergy. Recommend avoiding foods containing eggs and checking ingredient lists on packaged products."
    },
    {
      "name": "James Miller",
      "patient_id": "200-09",
      "sex": "Male",
      "age": 42,
      "blood_type": "O+",
      "allergies": ["Penicillin"],
      "date": "2024-11-29",
      "email": "james.miller@example.com",
      "note": "Patient has a penicillin allergy. Alternative antibiotics should be considered for infections, and medical staff should be alerted before prescribing medication."
    },
    {
      "name": "Olivia Davis",
      "patient_id": "200-10",
      "sex": "Female",
      "age": 36,
      "blood_type": "A-",
      "allergies": ["None"],
      "date": "2024-11-30",
      "email": "olivia.davis@example.com",
      "note": "Patient has no known allergies. Routine medical check-ups and a balanced lifestyle are recommended."
    }
  ];

  const records = [
    {
      "patient_id": "200-01",
      "last_checked": "2024-04-21",
      "prescription_id": "#24J83KT0",
      "observation": "High fever and cough at normal hemoglobin levels.",
      "prescription": [
        {"medicine": "Paracetamol", "dosage": "2 times a day"},
        {"medicine": "Wikoryl", "dosage": "Day and Night before meal"}
      ]
    },
    {
      "patient_id": "200-02",
      "last_checked": "2024-04-22",
      "prescription_id": "#A18X9YD3",
      "observation": "Mild allergic reaction due to peanut exposure.",
      "prescription": [
        {"medicine": "Antihistamine", "dosage": "Once a day as needed"}
      ]
    },
    {
      "patient_id": "200-03",
      "last_checked": "2024-04-23",
      "prescription_id": "#C92Z7PL5",
      "observation": "Shortness of breath after dust exposure.",
      "prescription": [
        {"medicine": "Inhaler", "dosage": "As needed"},
        {"medicine": "Antihistamine", "dosage": "Once a day"}
      ]
    },
    {
      "patient_id": "200-04",
      "last_checked": "2024-04-24",
      "prescription_id": "#D56X8YH2",
      "observation": "Mild stomach discomfort due to gluten ingestion.",
      "prescription": [
        {"medicine": "Digestive Enzyme", "dosage": "Before meals"},
        {"medicine": "Antihistamine", "dosage": "Once a day"}
      ]
    }
  ]

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  const totalPages = Math.ceil(patients.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPatients = patients.slice(startIndex, startIndex + rowsPerPage);

  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [selectedRecord, setSelectedRecord] = useState(records[0]);

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

  

  useEffect(() => {

    
    const selectedRecord = records.find((record) => record.patient_id === selectedPatient.patient_id);
    setSelectedRecord(selectedRecord);
  }), [selectedPatient];

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
                    <button className="text-blue-600 hover:underline" onClick={() => setSelectedPatient(patient)}>
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
            <h1 className="text-lg font-semibold text-gray-700">{selectedPatient.name}</h1>
            <p className="text-sm text-gray-500">Patient ID {selectedPatient.patient_id}</p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="p-6 space-y-4">
          <div className="text-sm space-y-1">
            <p><strong>Sex:</strong> {selectedPatient.sex}</p>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>Blood:</strong> {selectedPatient.blood_type}</p>
            <p><strong>Allergies:</strong> {selectedPatient.allergies}</p>
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
            <p className="text-sm">{selectedRecord.last_checked}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Observation</h2>
            <p className="text-sm">{selectedRecord.observation}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Prescription</h2>
            <p className="text-sm">{selectedRecord.prescription.map((item, index) => (
              <span key={index}>
                {item.medicine} - {item.dosage}
                {index < selectedRecord.prescription.length - 1 && <br />}
              </span>
            ))}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-1">Note</h2>
            <p className="text-sm">{selectedPatient.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsTable;
