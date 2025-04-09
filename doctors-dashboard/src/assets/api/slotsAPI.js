import { data } from "react-router-dom";

export const createSlots = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch(`https://doctor-aid-backend.onrender.com/api/slots/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create slots');
    }

    return data;

  } catch (error) {
    console.error('API Error:', data.message);
    throw error;
  }
};


export const getSlotsbySessionId = async (id) => {
  //const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://doctor-aid-backend.onrender.com/api/slots/getbySessionId/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     // Authorization: `Bearer ${token}`,
    },
  });
  const slots = await res.json();
  return slots;
  console.log("sessions:", res)
};
