// import { getDoctorDetails } from '../dashboard/application/dto/doctor.js';
// import Doctor from '../infrastructure/schema/doctor_schema.js';

// jest.mock('../infrastructure/schema/doctor_schema.js');

// const response = {
//     status: jest.fn(() => response),
//     json: jest.fn((x) => x),
// };

// describe('Doctor API', () => {
//     it('should return doctor details', async () => {
//         Doctor.findById.mockResolvedValue({
//             _id: '67c958318cdff8ddf422e966',
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john@example.com',
//             specialization: 'General Practice',
//             hospital: 'City Hospital',
//             location: 'Galle',
//         });

//         await getDoctorDetails({ params: { id: '67c958318cdff8ddf422e966' } }, response);

//         expect(response.status).toHaveBeenCalledWith(200);
//     });
// });

// import { getSessionsByDoctor } from '../dashboard/application/dto/doctor.js';
// import Session from '../infrastructure/schema/sessions_schema.js';

// jest.mock('../infrastructure/schema/sessions_schema.js');

// const response = {
//     status: jest.fn(() => response),
//     json: jest.fn((x) => x),
// };

// describe('Session API', () => {
//     it('should return sessions for a doctor', async () => {
//         Session.find.mockResolvedValue([
//             { _id: '67d5162df6237fc50782336c', doctorId: '67c958318cdff8ddf422e966', date: '2025-03-15', time: '09:30 AM' },
//         ]);

//         await getSessionsByDoctor({ params: { id: '67c958318cdff8ddf422e966' } }, response);

//         expect(response.status).toHaveBeenCalledWith(200);
//     });
// });

import { createDoctor } from '../dashboard/application/dto/doctor.js';
import Doctor from '../infrastructure/schema/doctor_schema.js';

jest.mock('../infrastructure/schema/doctor_schema.js');

const request = {
  body: {
    doctorId: 'DOC123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    contactNumber: '+1234567890',
    ppLocation: '/uploads/profile/doc123.jpg',
    description: 'Experienced physician with 10 years of practice',
    schedule: [
      { day: 'Monday', hours: '9AM-5PM' },
      { day: 'Wednesday', hours: '9AM-5PM' }
    ],
    specialization: 'Cardiology',
    hospital: 'City General Hospital',
    address: {
      line1: '123 Medical Drive',
      line2: 'Suite 100',
      city: 'Healthville'
    },
    certification: ['Board Certified', 'MBBS']
  }
};

const response = {
  status: jest.fn(() => response),
  json: jest.fn((x) => x),
  send: jest.fn((x) => x)
};

describe('Doctor API', () => {
  it('should create a doctor successfully', async () => {
    Doctor.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(request.body)
    }));

    await createDoctor(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(request.body);
  });

  it('should return 400 when required fields are missing', async () => {
    const badRequest = {
      body: {
        firstName: 'John',
        email: 'john.doe@example.com'
      }
    };

    await createDoctor(badRequest, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
  });

  it('should return 400 when address fields are incomplete', async () => {
    const badAddressRequest = {
      body: {
        ...request.body,
        address: {
          line1: '123 Medical Drive'
        }
      }
    };

    await createDoctor(badAddressRequest, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'Address line 1 and city are required.' });
  });

  it('should return 500 when database operation fails', async () => {
    const errorMessage = 'Database connection failed';
    Doctor.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error(errorMessage))
    }));

    await createDoctor(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});