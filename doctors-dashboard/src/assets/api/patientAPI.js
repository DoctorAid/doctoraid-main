
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


 