export const createSlots = async (formData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/slots/create`, {
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
    console.error('API Error:', error);
    throw error;
  }
};
