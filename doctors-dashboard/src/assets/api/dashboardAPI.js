// Base API URL
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * ===== RECORD API FUNCTIONS =====
 */

/**
 * Creates a new medical record
 * @param {string} doctorId - The doctor's ID
 * @param {Object} recordData - The record data to be created
 * @returns {Promise<Object>} The created record
 */
export const createRecord = async (doctorId, recordData) => {
  console.log("Creating record for doctor:", doctorId, "with data:", recordData);
  try {
    const response = await fetch(`${API_BASE_URL}/records/create/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordData),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create record');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets records by patient ID and doctor ID
 * @param {string} patientId - The patient's ID
 * @param {string} doctorId - The doctor's ID
 * @returns {Promise<Array>} Array of records
 */
export const getRecordsByPatientAndDoctor = async (patientId, doctorId) => {
  console.log("Fetching records for patient:", patientId, "and doctor:", doctorId);
  try {
    // Using URL params for this request
    const url = new URL(`${API_BASE_URL}/records/getByPatientId&DoctorId`);
    url.searchParams.append('patientId', patientId);
    url.searchParams.append('doctorId', doctorId);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch records');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets the consultation history for a patient
 * @param {string} patientId - The patient's ID
 * @returns {Promise<Array>} Array of consultation records
 */
export const getConsultationHistory = async (patientId) => {
  console.log("Fetching consultation history for patient:", patientId);
  try {
    const response = await fetch(`${API_BASE_URL}/records/history/${patientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch consultation history');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ===== PATIENT API FUNCTIONS =====
 */

/**
 * Gets patient details by ID
 * @param {string} patientId - The patient's ID
 * @returns {Promise<Object>} The patient details
 */
export const getPatientDetails = async (patientId) => {
  console.log("Fetching details for patient:", patientId);
  try {
    const response = await fetch(`${API_BASE_URL}/patients/get/details/${patientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch patient details');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets all patients for a specific doctor
 * @param {string} doctorId - The doctor's ID
 * @returns {Promise<Array>} Array of patients
 */
export const getDoctorPatients = async (doctorId) => {
  console.log("Fetching patients for doctor:", doctorId);
  try {
    const response = await fetch(`${API_BASE_URL}/patients/doctor/${doctorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctor patients');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Updates patient information
 * @param {string} patientId - The patient's ID
 * @param {Object} patientData - The updated patient data
 * @returns {Promise<Object>} The updated patient
 */
export const updatePatient = async (patientId, patientData) => {
  console.log("Updating patient:", patientId, "with data:", patientData);
  try {
    const response = await fetch(`${API_BASE_URL}/patients/update/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update patient');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ===== SESSION API FUNCTIONS =====
 */

/**
 * Gets the waiting list for a specific session
 * @param {string} sessionId - The session ID
 * @returns {Promise<Array>} The waiting list of patients
 */
export const getSessionWaitingList = async (sessionId) => {
  console.log("Fetching waiting list for session:", sessionId);
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/waitingList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch waiting list');
    }
    console.log("Waiting list fetched:", data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets the patient list for a specific session
 * @param {string} sessionId - The session ID
 * @returns {Promise<Array>} The list of patients for the session
 */
export const getSessionPatientList = async (sessionId) => {
  console.log("Fetching patient list for session:", sessionId);
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/patientList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch patient list');
    }
    console.log("Patient list fetched:", data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets all sessions for a specific doctor
 * @param {string} doctorId - The doctor's ID
 * @returns {Promise<Array>} Array of sessions
 */
export const getDoctorSessions = async (doctorId) => {
  console.log("Fetching sessions for doctor:", doctorId);
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/doctor/${doctorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctor sessions');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Gets session details by ID
 * @param {string} sessionId - The session ID
 * @returns {Promise<Object>} The session details
 */
export const getSessionDetails = async (sessionId) => {
  console.log("Fetching details for session:", sessionId);
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch session details');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ===== SLOTS API FUNCTIONS =====
 */

/**
 * Gets slots by session ID
 * @param {string} sessionId - The session ID
 * @returns {Promise<Array>} Array of slots
 */
export const getSlotsbySessionId = async (sessionId) => {
  console.log("Fetching slots for session:", sessionId);
  try {
    const response = await fetch(`${API_BASE_URL}/slots/getbySessionId/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch slots');
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};