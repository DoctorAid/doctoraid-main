
// patient API.js - Frontend API service for patient data

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Create a new patient
 * @param {Object} patientData - The patient data including name, email, phone, address, dob etc.
 * @returns {Promise<Object>} The created patient data
 */
export const createPatient = async (patientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create a patient');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * search patients by their first name, last name, or email
 * @param {string} query - The search query string
 * @param {string} searchBy - The search field (firstName, lastName, email)
 * @returns {Promise<Array>} Array of patient objects
 */

export const searchPatients = async (query, searchBy) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/search/by${searchBy}?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to search patients');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get all patients
 * @returns {Promise<Array>} Array of patient objects
 */

export const getPatients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/getPatients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch patients');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * get specific patient profile by ID
 * @param {string} patientId - The ID of the patient
 * @returns {Promise<Object>} The patient profile data
 */

export const getPatientProfile = async (patientId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/getPatientProfile/byPatientId?patientId=${patientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch patient profile');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * update patient details by ID
 * @param {string} patientId - The ID of the patient
 * @param {Object} updatedData - The updated patient data
 * @returns {Promise<Object>} The updated patient data
 */

export const updatePatientDetails = async (patientId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/editPatientDetails/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update patient details');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * sort patient list by first name
 * @param {string} order - The sorting order (asc, desc)
 * @returns {Promise<Array>} Array of patient objects
 */

export const sortPatientsByFirstName = async (order) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/sort/byFirstName?order=${order}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sort patients');
      }
      
      return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
        }
};

/**
 * get medical records by patient ID
 * @param {string} patientId - The ID of the patient
 * @returns {Promise<Array>} Array of medical record objects
 */

export const getMedicalRecords = async (patientId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/getMedicalRecords/byPatientId?patientId=${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch medical records');
      }
      
      return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
        }
};



 