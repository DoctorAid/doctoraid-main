export const getDoctorById = async (doctorId) => {
    console.log(`getDoctorById API called for doctor: ${doctorId}`); // Debugging log
  
    const res = await fetch(`http://localhost:5000/api/mobile/doctor/${doctorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`
      },
    });
  
    const doctor = await res.json();
    console.log("doctor:", doctor); // Debugging log
    return doctor;
  };