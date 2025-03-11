// recordAPI.js - Frontend API service for medical records

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Create a new medical record
 * @param {Object} recordData - The record data including prescription, patientId, doctorId, observation, notes, date
 * @returns {Promise<Object>} The created record data
 */
export const createRecord = async (recordData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records/create`, {
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
 * Get all records for a specific patient
 * @param {string} patientId - The ID of the patient
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} limit - Records per page (default: 10)
 * @returns {Promise<Object>} Records data with pagination info
 */
export const getRecordsByPatient = async (patientId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/records/getByPatientId?patientId=${patientId}&page=${page}&limit=${limit}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch patient records');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get records for a specific patient and doctor
 * @param {string} patientId - The ID of the patient
 * @param {string} doctorId - The ID of the doctor
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} limit - Records per page (default: 10)
 * @returns {Promise<Array>} Array of records
 */
export const getRecordsByPatientAndDoctor = async (patientId, doctorId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/records/getByPatientId&DoctorId?patientId=${patientId}&doctorId=${doctorId}&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
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
 * Get a specific record by its ID
 * @param {string} recordId - The ID of the record to retrieve
 * @returns {Promise<Object>} The record data
 */
export const getRecordById = async (recordId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/records/getByRecordId?id=${recordId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch record');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Update an existing record
 * @param {string} recordId - The ID of the record to update
 * @param {Object} updateData - Data to update (prescription, observation, notes, date)
 * @returns {Promise<Object>} The updated record data
 */
export const updateRecord = async (recordId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records/update/${recordId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update record');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};