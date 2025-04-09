/**
 * Base URL for the API server
 */
const BASE_URL = "http://localhost:8080";

/**
 * Base path for patient endpoints
 */
const PATIENTS_PATH = "/api/patients";

/**
 * Creates multiple patients 
 * @param {Array} patients - Array of patient objects to create
 * @returns {Promise<Object>} Promise that resolves to the server response
 */
export const createPatients = async (patients) => {
  console.log("createPatients API called");
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(patients),
  });
  
  const response = await res.json();
  console.log("createPatients response:", response);
  return response;
};

/**
 * Adds a single patient
 * @param {Object} patient - Patient object to add
 * @returns {Promise<Object>} Promise that resolves to the server response
 */
export const addPatient = async (patient) => {
  console.log("addPatient API called");
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(patient),
  });
  
  const response = await res.json();
  console.log("addPatient response:", response);
  return response;
};

/**
 * Updates a patient by ID
 * @param {string} id - ID of the patient to update
 * @param {Object} updatedData - Updated patient data
 * @returns {Promise<Object>} Promise that resolves to the server response
 */
export const updatePatient = async (id, updatedData) => {
  console.log("updatePatient API called for ID:", id);
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(updatedData),
  });
  
  const response = await res.json();
  console.log("updatePatient response:", response);
  return response;
};

/**
 * Gets nearby doctors for a patient
 * @param {string} patientId - ID of the patient
 * @returns {Promise<Array>} Promise that resolves to an array of nearby doctors
 */
export const getNearbyDoctors = async (patientId) => {
  console.log("getNearbyDoctors API called for patient ID:", patientId);
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/nearby-doctors/${patientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  const doctors = await res.json();
  console.log("Nearby doctors:", doctors);
  return doctors;
};

/**
 * Books a slot with a doctor
 * @param {string} slotId - ID of the slot to book
 * @param {Object} bookingData - Data required for booking
 * @returns {Promise<Object>} Promise that resolves to the booking confirmation
 */
export const bookSlot = async (slotId, bookingData) => {
  console.log("bookSlot API called for slot ID:", slotId);
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/doctors/${slotId}/book`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(bookingData),
  });
  
  const booking = await res.json();
  console.log("Booking response:", booking);
  return booking;
};

/**
 * Enters a PIN for a booked appointment
 * @param {Object} pinData - Object containing PIN and booking information
 * @returns {Promise<Object>} Promise that resolves to the verification response
 */
export const enterPin = async (pinData) => {
  console.log("enterPin API called");
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/booked/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(pinData),
  });
  
  const response = await res.json();
  console.log("PIN verification response:", response);
  return response;
};

/**
 * Searches for doctors based on query parameters
 * @param {Object} searchParams - Search parameters (e.g., specialty, location)
 * @returns {Promise<Array>} Promise that resolves to an array of matching doctors
 */
export const searchDoctors = async (searchParams) => {
  console.log("searchDoctors API called with params:", searchParams);
  
  // Convert search params to URL query string
  const queryString = new URLSearchParams(searchParams).toString();
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/doctors/search?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  const doctors = await res.json();
  console.log("Search results:", doctors);
  return doctors;
};

/**
 * Gets medical records by family ID
 * @param {string} familyId - ID of the family
 * @returns {Promise<Array>} Promise that resolves to an array of medical records
 */
export const getRecordsByFamilyId = async (familyId) => {
  console.log("getRecordsByFamilyId API called for family ID:", familyId);
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/family/records/${familyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  const records = await res.json();
  console.log("Family records:", records);
  return records;
};

/**
 * Subscribes to a doctor
 * @param {Object} subscriptionData - Data containing doctor and family information
 * @returns {Promise<Object>} Promise that resolves to the subscription confirmation
 */
export const subscribeDoctor = async (subscriptionData) => {
  console.log("subscribeDoctor API called");
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/doctors/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(subscriptionData),
  });
  
  const response = await res.json();
  console.log("Subscription response:", response);
  return response;
};

/**
 * Unsubscribes from a doctor
 * @param {Object} unsubscriptionData - Data containing doctor and family information
 * @returns {Promise<Object>} Promise that resolves to the unsubscription confirmation
 */
export const unsubscribeDoctor = async (unsubscriptionData) => {
  console.log("unsubscribeDoctor API called");
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/doctors/unsubscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
    body: JSON.stringify(unsubscriptionData),
  });
  
  const response = await res.json();
  console.log("Unsubscription response:", response);
  return response;
};

/**
 * Gets all subscribed doctors for a family
 * @param {string} familyId - ID of the family
 * @returns {Promise<Array>} Promise that resolves to an array of subscribed doctors
 */
export const getSubscribedDoctors = async (familyId) => {
  console.log("getSubscribedDoctors API called for family ID:", familyId);
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/doctors/subscribed/${familyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  const doctors = await res.json();
  console.log("Subscribed doctors:", doctors);
  return doctors;
};

/**
 * Gets all bookings for a family
 * @param {string} familyId - ID of the family
 * @returns {Promise<Array>} Promise that resolves to an array of bookings
 */
export const getAllBookings = async (familyId) => {
  console.log("getAllBookings API called for family ID:", familyId);
  
  const res = await fetch(`${BASE_URL}${PATIENTS_PATH}/bookings/${familyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Uncomment when auth is implemented
    },
  });
  
  const bookings = await res.json();
  console.log("All bookings:", bookings);
  return bookings;
};