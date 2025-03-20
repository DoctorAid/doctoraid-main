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