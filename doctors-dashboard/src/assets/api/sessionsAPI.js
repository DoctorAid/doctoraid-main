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