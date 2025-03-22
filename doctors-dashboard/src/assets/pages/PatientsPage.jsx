import React from 'react';
import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Eye, ArrowLeft, ArrowRight } from 'lucide-react';

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
      "history": [
        {
          "date": "2024-04-21",
          "prescription_id": "#24J83KT0",
          "observation": "High fever and cough at normal hemoglobin levels.",
          "prescription": [
            {"medicine": "Paracetamol", "dosage": "2 times a day"},
            {"medicine": "Wikoryl", "dosage": "Day and Night before meal"}
          ]
        },
        {
          "date": "2024-03-15",
          "prescription_id": "#24J15RT2",
          "observation": "Seasonal allergies with runny nose and itchy eyes.",
          "prescription": [
            {"medicine": "Cetirizine", "dosage": "Once daily"},
            {"medicine": "Nasal Spray", "dosage": "Twice daily"}
          ]
        },
        {
          "date": "2024-01-05",
          "prescription_id": "#23K93LM7",
          "observation": "Annual checkup. All vitals normal.",
          "prescription": []
        }
      ]
    },
    {
      "patient_id": "200-02",
      "history": [
        {
          "date": "2024-04-22",
          "prescription_id": "#A18X9YD3",
          "observation": "Mild allergic reaction due to peanut exposure.",
          "prescription": [
            {"medicine": "Antihistamine", "dosage": "Once a day as needed"}
          ]
        },
        {
          "date": "2024-02-18",
          "prescription_id": "#B27Y5FT9",
          "observation": "Skin rash after latex contact.",
          "prescription": [
            {"medicine": "Topical Steroid Cream", "dosage": "Apply to affected area twice daily"}
          ]
        }
      ]
    },
    {
      "patient_id": "200-03",
      "history": [
        {
          "date": "2024-04-23",
          "prescription_id": "#C92Z7PL5",
          "observation": "Shortness of breath after dust exposure.",
          "prescription": [
            {"medicine": "Inhaler", "dosage": "As needed"},
            {"medicine": "Antihistamine", "dosage": "Once a day"}
          ]
        },
        {
          "date": "2024-03-10",
          "prescription_id": "#D35L7MT1",
          "observation": "Routine checkup. Slightly elevated blood pressure.",
          "prescription": [
            {"medicine": "Blood Pressure Monitoring", "dosage": "Daily tracking"}
          ]
        }
      ]
    },
    {
      "patient_id": "200-04",
      "history": [
        {
          "date": "2024-04-24",
          "prescription_id": "#D56X8YH2",
          "observation": "Mild stomach discomfort due to gluten ingestion.",
          "prescription": [
            {"medicine": "Digestive Enzyme", "dosage": "Before meals"},
            {"medicine": "Antihistamine", "dosage": "Once a day"}
          ]
        }
      ]
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [patientHistory, setPatientHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const rowsPerPage = 8; // Increased to fit more patients on screen

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
    // Reset history index when selecting a new patient
    setCurrentHistoryIndex(0);
  };

  const navigateHistory = (direction) => {
    if (direction === 'next' && currentHistoryIndex < patientHistory.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    } else if (direction === 'prev' && currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Find matching record history for selected patient
  useEffect(() => {
    const record = records.find(record => record.patient_id === selectedPatient.patient_id);
    setPatientHistory(record?.history || []);
    setCurrentHistoryIndex(0); // Reset to first history entry
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
      <div className="flex justify-center items-center h-full w-full bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#295567]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-[#FAFAF9] rounded-tl-3xl overflow-hidden animate-pageTransition font-['Raleway',sans-serif]">
      {/* Main Table Section */}
      <div className="w-3/5 h-full border-r border-gray-200 bg-white rounded-tl-3xl shadow-md">
        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-white rounded-tl-3xl">
            <h2 className="font-bold text-lg text-gray-800">Patients Directory</h2>
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
              Total: {patients.length}
            </span>
          </div>

          {/* Filter and Search Section */}
          <div className="p-4 flex items-center space-x-4 border-b border-gray-200 bg-white">
            <div className="flex-1 relative font-['Raleway',sans-serif]">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-y-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age/Sex
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient, index) => (
                  <tr 
                    key={patient.patient_id}
                    className={`group transition-colors duration-150 ${
                      selectedPatient.patient_id === patient.patient_id 
                        ? "bg-[#295567]/5" 
                        : index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    style={{
                      animationName: 'fadeIn',
                      animationDuration: '0.5s',
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 flex-shrink-0 mr-3 rounded-full flex items-center justify-center text-xs font-medium
                          ${selectedPatient.patient_id === patient.patient_id 
                            ? "bg-[#295567] text-white" 
                            : "bg-[#295567]/20 text-[#295567]"}`}
                        >
                          {getInitials(patient.name)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {patient.age} / {patient.sex}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{patient.date}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => handlePatientSelect(patient)}
                        className={`inline-flex items-center gap-1 transition-all duration-300 rounded-lg px-2 py-1
                          ${selectedPatient.patient_id === patient.patient_id 
                            ? "text-[#295567] bg-[#295567]/10" 
                            : "text-[#295567] hover:bg-[#295567]/10"}`}
                      >
                        <span>View</span>
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="px-4 py-3 flex justify-between items-center border-t border-gray-200 bg-white">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#295567] hover:bg-[#295567]/10"
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
                  : "text-[#295567] hover:bg-[#295567]/10"
              } transition-all duration-300`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Details Section */}
      <div className="w-2/5 h-full bg-[#FAFAF9]">
        <div className={`h-full overflow-hidden transition-all duration-300 flex flex-col ${showDetails ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#295567] to-[#295567]/80 px-4 py-4 border-b border-[#295567]/40 shadow-md rounded-tr-3xl">
            <div className="flex items-center">
              <div className="h-12 w-12 flex justify-center items-center bg-white rounded-full text-lg font-bold text-[#295567] shadow-md">
                {getInitials(selectedPatient.name)}
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-white">{selectedPatient.name}</h1>
                <div className="flex space-x-2 mt-1">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium text-white">
                    {selectedPatient.age} yrs
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium text-white">
                    {selectedPatient.sex}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium text-white">
                    {selectedPatient.blood_type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="p-4 space-y-4 overflow-y-auto flex-grow">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Allergies</h2>
              <div className="bg-[#FAFAF9] p-2 rounded-xl border border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {selectedPatient.allergies.map((allergy, index) => (
                    <span key={index} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Medical History Navigation */}
            {patientHistory.length > 0 ? (
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-semibold text-gray-700">Medical History</h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => navigateHistory('prev')}
                      disabled={currentHistoryIndex === 0}
                      className={`${currentHistoryIndex === 0 ? 'text-gray-300' : 'text-[#295567]'} hover:bg-[#FAFAF9] p-1 rounded-full`}
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <span className="text-xs text-gray-600">
                      {currentHistoryIndex + 1} of {patientHistory.length}
                    </span>
                    <button
                      onClick={() => navigateHistory('next')}
                      disabled={currentHistoryIndex === patientHistory.length - 1}
                      className={`${currentHistoryIndex === patientHistory.length - 1 ? 'text-gray-300' : 'text-[#295567]'} hover:bg-[#FAFAF9] p-1 rounded-full`}
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] p-3 rounded-xl mb-2 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-gray-800">{patientHistory[currentHistoryIndex].date}</p>
                    <span className="text-xs bg-[#295567]/10 text-[#295567] px-2 py-0.5 rounded-full">
                      {patientHistory[currentHistoryIndex].prescription_id}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Observation</p>
                  <p className="text-sm text-gray-800 mb-2">{patientHistory[currentHistoryIndex].observation}</p>
                  
                  {patientHistory[currentHistoryIndex].prescription.length > 0 ? (
                    <>
                      <p className="text-xs text-gray-500 mb-1">Prescription</p>
                      <ul className="space-y-2">
                        {patientHistory[currentHistoryIndex].prescription.map((med, index) => (
                          <li key={index} className="p-2 bg-white rounded-xl border border-gray-100">
                            <p className="text-sm font-medium text-gray-800">{med.medicine}</p>
                            <p className="text-xs text-gray-500">{med.dosage}</p>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No medications prescribed</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Medical History</h2>
                <div className="bg-[#FAFAF9] p-3 rounded-xl text-center border border-gray-100">
                  <p className="text-sm text-gray-500">No medical records available</p>
                </div>
              </div>
            )}
            
            {/* Notes */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Physician's Notes</h2>
              <div className="bg-[#FAFAF9] p-3 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-700">{selectedPatient.note}</p>
              </div>
            </div>
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
        
        @keyframes pageTransition {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PatientsTable;