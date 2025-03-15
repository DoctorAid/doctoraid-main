
const API_BASE_URL = 'http://localhost:5000/api';

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
// export const getRecordsByPatient = async (patientId, page = 1, limit = 10) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/records/getByPatientId?patientId=${patientId}&page=${page}&limit=${limit}`, 
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
    
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to fetch patient records');
//     }
    
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const getRecordsByPatientAndDoctor = async (patientId, doctorId, page = 1, limit = 10) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/records/getByPatientId&DoctorId?patientId=${patientId}&doctorId=${doctorId}&page=${page}&limit=${limit}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
    
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to fetch records');
//     }
    
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const getRecordById = async (recordId) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/records/getByRecordId?id=${recordId}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
    
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to fetch record');
//     }
    
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


// export const updateRecord = async (recordId, updateData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/records/update/${recordId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updateData),
//     });
    
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to update record');
//     }
    
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };