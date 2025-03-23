import React, { useState, useEffect } from 'react';
import { getSubscribedPatients } from '../api/patientPageAPI';
import { Search, ChevronLeft, ChevronRight, Eye, ArrowLeft, ArrowRight } from 'lucide-react';

const PatientPage = () => {
  // Hard-code the doctor ID to match what's used in your dashboard
  const doctorId = "67d8aff139afa54b845fc507";
  
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching patients for doctor ID:", doctorId);
        const result = await getSubscribedPatients(doctorId);
        
        if (result.success) {
          console.log("Patients fetched successfully:", result.data.patients);
          setPatients(result.data.patients || []);
          // Set the first patient as selected if there are any patients
          if (result.data.patients && result.data.patients.length > 0) {
            setSelectedPatient(result.data.patients[0]);
          }
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(err.message || 'An error occurred while fetching patients');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatients();
  }, []); // No dependency on doctorId since it's now hardcoded

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (patient.lastVisit && patient.lastVisit.includes(searchTerm))
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-white">
        <div className="text-red-500">Error: {error}</div>
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
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient, index) => (
                    <tr 
                      key={patient._id}
                      className={`group transition-colors duration-150 ${
                        selectedPatient?._id === patient._id 
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
                            ${selectedPatient?._id === patient._id 
                              ? "bg-[#295567] text-white" 
                              : "bg-[#295567]/20 text-[#295567]"}`}
                          >
                            {getInitials(patient.name)}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {patient.age} / {patient.gender}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'No visits'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => handlePatientSelect(patient)}
                          className={`inline-flex items-center gap-1 transition-all duration-300 rounded-lg px-2 py-1
                            ${selectedPatient?._id === patient._id 
                              ? "text-[#295567] bg-[#295567]/10" 
                              : "text-[#295567] hover:bg-[#295567]/10"}`}
                        >
                          <span>View</span>
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No patients found. Check your doctor ID or subscription status.
                    </td>
                  </tr>
                )}

                {/* Add empty rows to maintain consistent height when fewer than 10 patients */}
                {currentPatients.length > 0 && currentPatients.length < rowsPerPage && 
                  Array.from({ length: rowsPerPage - currentPatients.length }).map((_, index) => (
                    <tr key={`empty-${index}`} className="h-[51px]">
                      <td colSpan={4}></td>
                    </tr>
                  ))
                }
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
        {selectedPatient ? (
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
                      {selectedPatient.gender}
                    </span>
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium text-white">
                      {selectedPatient.bloodGroup}
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
                    {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                      selectedPatient.allergies.map((allergy, index) => (
                        <span key={index} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">No allergies recorded</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h2>
                <div className="bg-[#FAFAF9] p-2 rounded-xl border border-gray-100 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-700">{selectedPatient.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-700">{selectedPatient.contactNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Medical Status */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Medical Status</h2>
                <div className="bg-[#FAFAF9] p-2 rounded-xl border border-gray-100 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Last Visit</p>
                      <p className="text-sm text-gray-700">
                        {selectedPatient.lastVisit ? new Date(selectedPatient.lastVisit).toLocaleDateString() : 'No visits recorded'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Medical Records</p>
                      <p className="text-sm text-gray-700">{selectedPatient.hasMedicalRecords ? 'Available' : 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Patient Notes */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Patient Notes</h2>
                <div className="bg-[#FAFAF9] p-3 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-700">
                    {selectedPatient.patientNote || "No notes available for this patient."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a patient to view details</p>
          </div>
        )}
      </div>
      
      {/* Define animations */}
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

export default PatientPage;