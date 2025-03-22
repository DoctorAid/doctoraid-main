import React from 'react';
import { useState, useEffect } from "react";
import { Search, Filter, Plus, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const PatientsTable = () => {
  const patients = [
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
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const rowsPerPage = 6;

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               patient.date.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + rowsPerPage);

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

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    // Add animation by temporarily hiding details
    setShowDetails(false);
    setTimeout(() => setShowDetails(true), 300);
  };

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Find matching record for selected patient
  useEffect(() => {
    const record = records.find(record => record.patient_id === selectedPatient.patient_id);
    setSelectedRecord(record || null);
  }, [selectedPatient]);

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gray-50 min-h-screen p-4 animate-[fadeIn_0.4s_ease-out]">
      {/* Main Table Section */}
      <div className="md:w-2/3 animate-[slideInLeft_0.5s_ease-out]">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-white">
            <div className="flex space-x-4">
              {["All", "Booked", "Special"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-medium transition-all duration-300 px-3 py-1 rounded-full ${
                    activeTab === tab
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Total Patients: {patients.length}
            </span>
          </div>

          {/* Filter and Search Section */}
          <div className="p-6 flex items-center space-x-4 border-b border-gray-100 bg-gray-50">
            <button className="p-2 text-gray-600 bg-white rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
              <Filter size={16} /> <span className="text-sm font-medium">Filter</span>
            </button>
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or date..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="p-2 text-white bg-blue-600 rounded-lg shadow-sm flex items-center gap-2 hover:bg-blue-700 transition-all transform hover:scale-105">
              <Plus size={16} /> <span className="text-sm font-medium">Add Patient</span>
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Info
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient, index) => (
                  <tr 
                    key={patient.patient_id}
                    className={`group hover:bg-blue-50 transition-colors duration-150 ${
                      selectedPatient.patient_id === patient.patient_id ? "bg-blue-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{
                      animationName: 'fadeIn',
                      animationDuration: '0.5s',
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
                          {getInitials(patient.name)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-xs text-gray-500">ID: {patient.patient_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{patient.email}</div>
                      <div className="text-xs text-gray-500">Last visit: {patient.date}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handlePatientSelect(patient)}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-all duration-300 hover:translate-x-1"
                      >
                        <span>View</span>
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="px-6 py-4 flex justify-between items-center border-t border-gray-100 bg-gray-50">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              } transition-all duration-300`}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-gray-500">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-2 rounded-full ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              } transition-all duration-300`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Details Section */}
      <div className="md:w-1/3 animate-[slideInRight_0.5s_ease-out]">
        <div className={`bg-white rounded-2xl shadow-lg h-full overflow-hidden transition-opacity duration-300 ${showDetails ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 border-b border-blue-400">
            <div className="flex items-center">
              <div className="h-16 w-16 flex justify-center items-center bg-white rounded-full text-xl font-bold text-blue-700 shadow-md">
                {getInitials(selectedPatient.name)}
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-white">{selectedPatient.name}</h1>
                <div className="flex space-x-2 mt-1">
                  <span className="px-2 py-1 bg-blue-400 bg-opacity-30 rounded-full text-xs font-medium text-white">
                    ID: {selectedPatient.patient_id}
                  </span>
                  <span className="px-2 py-1 bg-blue-400 bg-opacity-30 rounded-full text-xs font-medium text-white">
                    {selectedPatient.age} yrs
                  </span>
                  <span className="px-2 py-1 bg-blue-400 bg-opacity-30 rounded-full text-xs font-medium text-white">
                    {selectedPatient.sex}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="p-6 space-y-5 max-h-[calc(100vh-230px)] overflow-y-auto">
            {/* Basic Info Card */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Basic Information</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Blood Type</p>
                  <p className="text-sm font-medium text-gray-800">{selectedPatient.blood_type}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPatient.allergies.map((allergy, index) => (
                      <span key={index} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Complaints Card */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Complaints</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-1.5 bg-blue-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Persistent headache for three days</p>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-1.5 bg-blue-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Mild shortness of breath during activity</p>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-1.5 bg-blue-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Occasional dizziness when standing up</p>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-1.5 bg-blue-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">Morning nausea without vomiting</p>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-1.5 bg-blue-500 rounded-full mr-2"></span>
                  <p className="text-sm text-gray-700">General fatigue throughout the day</p>
                </li>
              </ul>
            </div>

            {/* Last Medical Record */}
            {selectedRecord ? (
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-semibold text-gray-700">Last Medical Record</h2>
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {selectedRecord.last_checked}
                  </span>
                </div>
                
                <div className="bg-white p-3 rounded-lg mb-3">
                  <p className="text-xs text-gray-500 mb-1">Observation</p>
                  <p className="text-sm text-gray-800">{selectedRecord.observation}</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Prescription</p>
                  <ul className="space-y-2 mt-2">
                    {selectedRecord.prescription.map((med, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-green-800">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{med.medicine}</p>
                          <p className="text-xs text-gray-500">{med.dosage}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm text-center">
                <p className="text-sm text-gray-500">No medical records available</p>
              </div>
            )}
            
            {/* Notes */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Physician's Notes</h2>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-700">{selectedPatient.note}</p>
              </div>
            </div>
          </div>
          
          {/* Actions Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
            <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300">
              Edit Details
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Add Prescription
            </button>
          </div>
        </div>
      </div>
      
      {/* Add this at the bottom to define animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PatientsTable;