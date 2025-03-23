/**
 * Creates a new doctor profile
 * @param {Object} doctorData - The doctor profile data
 * @returns {Promise<Object>} The created doctor profile
 */
export const createDoctorProfile = async (doctorData) => {
    const API_BASE_URL = 'http://localhost:8080/api';
  
    try {
      console.log("Creating doctor profile with data:", doctorData);
      
      const response = await fetch(`${API_BASE_URL}/doctors/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if your API requires authentication
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(doctorData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create doctor profile');
      }
      
      console.log("Doctor profile created successfully:", data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };