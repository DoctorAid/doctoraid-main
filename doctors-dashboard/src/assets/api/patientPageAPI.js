const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Gets all subscribed patients for a specific doctor
 * @param {string} doctorId - The doctor's ID
 * @returns {Promise<Object>} Object containing patient data
 */
export const getSubscribedPatients = async (doctorId) => {
    console.log("Fetching subscribed patients for doctor:", doctorId);
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/all/patients/${doctorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch subscribed patients');
      }
      console.log("Subscribed patients fetched:", data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };