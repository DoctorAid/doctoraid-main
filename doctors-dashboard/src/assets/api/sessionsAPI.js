export const getSessionsByDocId = async (id) => {
    //const token = await window.Clerk?.session?.getToken();
  
    const res = await fetch(`http://localhost:5000/api/sessions/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       // Authorization: `Bearer ${token}`,
      },
    });
    const sessions = await res.json();
    return sessions;
    console.log("sessions:", sessions)
  };

export const getAllSessions = async () => {
  //const token = await window.Clerk?.session?.getToken();
  console.log("getAllSessions API called"); // Debugging log  

  const res = await fetch("http://localhost:5000/api/sessions/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

  const sessions = await res.json();
  console.log("sessions:", sessions); // Debugging log
  return sessions;
};

/**
 * Fetches the list of patients from the backend API
 * This function calls the /patientslist endpoint on the sessions router
 * 
 * @returns {Promise<Array>} Promise that resolves to an array of patient objects
 */
export const getPatientsList = async () => {
  // Debugging log to track API calls
  console.log("getPatientsList API called"); 
  
  // Make a GET request to the patients list endpoint
  const res = await fetch("http://localhost:5000/api/sessions/patientslist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  // Parse the JSON response
  const patients = await res.json();
  
  // Debugging log to inspect the returned data
  console.log("patients:", patients);
  
  // Return the patients data to the caller
  return patients;
};

/**
 * Fetches the waiting list from the backend API
 * This function calls the /waitinglist endpoint on the sessions router
 * 
 * @returns {Promise<Array>} Promise that resolves to an array of waiting patients
 */
export const getWaitingList = async () => {
  // Debugging log to track API calls
  console.log("getWaitingList API called");
  
  // Make a GET request to the waiting list endpoint
  const res = await fetch("http://localhost:5000/api/sessions/waitinglist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  // Parse the JSON response
  const waitingList = await res.json();
  
  // Debugging log to inspect the returned data
  console.log("waitingList:", waitingList);
  
  // Return the waiting list data to the caller
  return waitingList;
};