
const API_BASE_URL = "http://localhost:5000/api/doctors";

/**
 * Fetches all doctor details
 * @returns {Promise<Array>} Array of doctor objects
 */
export const getAllDoctors = async () => {
  console.log("getAllDoctors API called");
  const response = await fetch(`${API_BASE_URL}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching doctors: ${response.statusText}`);
  }
  
  const doctors = await response.json();
  console.log("doctors:", doctors);
  return doctors;
};

/**
 * Creates a new doctor
 * @param {Object} doctorData - Doctor information
 * @returns {Promise<Object>} Created doctor object
 */
export const createDoctor = async (doctorData) => {
  console.log("createDoctor API called");
  const response = await fetch(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctorData),
  });
  
  if (!response.ok) {
    throw new Error(`Error creating doctor: ${response.statusText}`);
  }
  
  const result = await response.json();
  console.log("Created doctor:", result);
  return result;
};

/**
 * Deletes a doctor by ID
 * @param {string} doctorId - The ID of the doctor to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteDoctor = async (doctorId) => {
  console.log("deleteDoctor API called for ID:", doctorId);
  const response = await fetch(`${API_BASE_URL}/delete?doctorId=${doctorId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error deleting doctor: ${response.statusText}`);
  }
  
  const result = await response.json();
  console.log("Delete result:", result);
  return result;
};

/**
 * Gets all sessions for a specific doctor
 * @param {string} doctorId - The ID of the doctor
 * @returns {Promise<Array>} Array of session objects
 */
export const getSessionsByDoctor = async (doctorId) => {
  console.log("getSessionsByDoctor API called for ID:", doctorId);
  const response = await fetch(`${API_BASE_URL}/sessions/${doctorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching sessions: ${response.statusText}`);
  }
  
  const sessions = await response.json();
  console.log("Sessions:", sessions);
  return sessions;
};

/**
 * Gets all patients for a specific doctor
 * @param {string} doctorId - The ID of the doctor
 * @returns {Promise<Array>} Array of patient objects
 */
export const getPatientsByDoctor = async (doctorId) => {
  console.log("getPatientsByDoctor API called for ID:", doctorId);
  const response = await fetch(`${API_BASE_URL}/patients?doctorId=${doctorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching patients: ${response.statusText}`);
  }
  
  const patients = await response.json();
  console.log("Patients:", patients);
  return patients;
};

/**
 * Adds a doctor to a patient's list of doctors
 * @param {string} patientId - The ID of the patient
 * @param {string} doctorId - The ID of the doctor
 * @returns {Promise<Object>} Updated patient object
 */
export const addDoctorToPatient = async (patientId, doctorId) => {
  console.log("addDoctorToPatient API called");
  const response = await fetch(`${API_BASE_URL}/addPatient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ patientId, doctorId }),
  });
  
  if (!response.ok) {
    throw new Error(`Error adding doctor to patient: ${response.statusText}`);
  }
  
  const result = await response.json();
  console.log("Doctor added to patient:", result);
  return result;
};

/**
 * Gets active appointments for a specific doctor
 * @param {string} doctorId - The ID of the doctor
 * @returns {Promise<Array>} Array of appointment objects
 */
export const getActiveAppointmentsByDoctor = async (doctorId) => {
  console.log("getActiveAppointmentsByDoctor API called for ID:", doctorId);
  const response = await fetch(`${API_BASE_URL}/activeAppointments?doctorId=${doctorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching active appointments: ${response.statusText}`);
  }
  
  const appointments = await response.json();
  console.log("Active appointments:", appointments);
  return appointments;
};

/**
 * Gets the total patient count for a specific doctor
 * @param {string} doctorId - The ID of the doctor
 * @returns {Promise<Object>} Object containing total patient count
 */
export const getTotalPatientCountByDoctor = async (doctorId) => {
  console.log("getTotalPatientCountByDoctor API called for ID:", doctorId);
  const response = await fetch(`${API_BASE_URL}/totalPatients?doctorId=${doctorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching total patient count: ${response.statusText}`);
  }
  
  const result = await response.json();
  console.log("Total patient count:", result);
  return result;
};