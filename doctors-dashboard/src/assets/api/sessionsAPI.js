export const getSessionsByDocId = async (id) => {
    //const token = await window.Clerk?.session?.getToken();
    console.log("getSessionsByDocId API called");
  
    const res = await fetch(`http://localhost:5000/api/sessions/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       // Authorization: `Bearer ${token}`,
      },
    });
    const sessions = await res.json();
    return sessions;
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
