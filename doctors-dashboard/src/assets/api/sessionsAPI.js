// export const getSessionsByDocId = async (id) => {
//     //const token = await window.Clerk?.session?.getToken();
  
//     const res = await fetch(`http://localhost:5000/api/sessions/get/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//        // Authorization: `Bearer ${token}`,
//       },
//     });
//     const sessions = await res.json();
//     return sessions;
//     console.log("sessions:", sessions)
//   };

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
