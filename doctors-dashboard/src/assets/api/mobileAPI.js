export const getDoctorById = async (doctorId) => {
    console.log(`getDoctorById API called for doctor: ${doctorId}`); // Debugging log
  
    const res = await fetch(`http://localhost:5000/api/mobile/doctor/${doctorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, 
      },
    });
  
    const doctor = await res.json();
    console.log("doctor:", doctor); // Debugging log
    return doctor;
  };

  export const searchDoctors = async (searchParams) => {
    console.log("searchDoctors API called with params:", searchParams); // Debugging log
    
    // Convert search parameters to URL query string
    const queryString = new URLSearchParams(searchParams).toString();
    
    const res = await fetch(`http://localhost:5000/api/mobile/doctors/search?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, 
      },
    });
  
    const doctors = await res.json();
    console.log("search results:", doctors); // Debugging log
    return doctors;
  };

  export const getFamilyById = async (familyId) => {
    console.log(`getFamilyById API called for family: ${familyId}`); // Debugging log
  
    const res = await fetch(`http://localhost:5000/api/mobile/family-profile/${familyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, 
      },
    });
  
    const family = await res.json();
    console.log("family profile:", family); // Debugging log
    return family;
  };

  export const bookSlot = async (bookingData) => {
    console.log("bookSlot API called with data:", bookingData); // Debugging log
  
    const res = await fetch("http://localhost:5000/api/mobile/slots/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Uncomment if authentication is needed
      },
      body: JSON.stringify(bookingData),
    });
  
    const bookingResult = await res.json();
    console.log("booking result:", bookingResult); // Debugging log
    return bookingResult;
  };

  export const getActiveAppointments = async (patientId) => {
    console.log(`getActiveAppointments API called for patient: ${patientId}`); // Debugging log
  
    const res = await fetch(`http://localhost:5000/api/mobile/appointments/active/${patientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Uncomment if authentication is needed
      },
    });
  
    const appointments = await res.json();
    console.log("active appointments:", appointments); // Debugging log
    return appointments;
  };