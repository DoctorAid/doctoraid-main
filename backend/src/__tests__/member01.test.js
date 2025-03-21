import { getDoctorDetails } from '../dashboard/application/dto/doctor.js';
import Doctor from '../infrastructure/schema/doctor_schema.js';

jest.mock('../infrastructure/schema/doctor_schema.js');

const response = {
    status: jest.fn(() => response),
    json: jest.fn((x) => x),
};

describe('Doctor API', () => {
    it('should return doctor details', async () => {
        Doctor.findById.mockResolvedValue({
            _id: '67c958318cdff8ddf422e966',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            specialization: 'General Practice',
            hospital: 'City Hospital',
            location: 'Galle',
        });

        await getDoctorDetails({ params: { id: '67c958318cdff8ddf422e966' } }, response);

        expect(response.status).toHaveBeenCalledWith(200);
    });
});



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



// import { createDoctor } from '../dashboard/application/dto/doctor.js';
// import Doctor from '../infrastructure/schema/doctor_schema.js';

// jest.mock('../infrastructure/schema/doctor_schema.js');

// const request = {
//   body: {
//     doctorId: 'DOC123',
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     contactNumber: '+1234567890',
//     ppLocation: '/uploads/profile/doc123.jpg',
//     description: 'Experienced physician with 10 years of practice',
//     schedule: [
//       { day: 'Monday', hours: '9AM-5PM' },
//       { day: 'Wednesday', hours: '9AM-5PM' }
//     ],
//     specialization: 'Cardiology',
//     hospital: 'City General Hospital',
//     address: {
//       line1: '123 Medical Drive',
//       line2: 'Suite 100',
//       city: 'Healthville'
//     },
//     certification: ['Board Certified', 'MBBS']
//   }
// };

// const response = {
//   status: jest.fn(() => response),
//   json: jest.fn((x) => x),
//   send: jest.fn((x) => x)
// };

// describe('Doctor API', () => {
//   it('should create a doctor successfully', async () => {
//     Doctor.mockImplementation(() => ({
//       save: jest.fn().mockResolvedValue(request.body)
//     }));

//     await createDoctor(request, response);

//     expect(response.status).toHaveBeenCalledWith(201);
//     expect(response.json).toHaveBeenCalledWith(request.body);
//   });

//   it('should return 400 when required fields are missing', async () => {
//     const badRequest = {
//       body: {
//         firstName: 'John',
//         email: 'john.doe@example.com'
//       }
//     };

//     await createDoctor(badRequest, response);

//     expect(response.status).toHaveBeenCalledWith(400);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
//   });

//   it('should return 400 when address fields are incomplete', async () => {
//     const badAddressRequest = {
//       body: {
//         ...request.body,
//         address: {
//           line1: '123 Medical Drive'
//         }
//       }
//     };

//     await createDoctor(badAddressRequest, response);

//     expect(response.status).toHaveBeenCalledWith(400);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Address line 1 and city are required.' });
//   });

//   it('should return 500 when database operation fails', async () => {
//     const errorMessage = 'Database connection failed';
//     Doctor.mockImplementation(() => ({
//       save: jest.fn().mockRejectedValue(new Error(errorMessage))
//     }));

//     await createDoctor(request, response);

//     expect(response.status).toHaveBeenCalledWith(500);
//     expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
//   });
// });


// import { deleteDoctorDetails } from '../dashboard/application/dto/doctor.js';
// import Doctor from '../infrastructure/schema/doctor_schema.js';

// jest.mock('../infrastructure/schema/doctor_schema.js');

// const request = {
//   query: {
//     doctorId: '507f1f77bcf86cd799439011'
//   }
// };

// const response = {
//   status: jest.fn(() => response),
//   json: jest.fn((x) => x),
//   send: jest.fn((x) => x)
// };

// describe('Doctor API - Delete Doctor', () => {
//   it('should delete a doctor successfully', async () => {
//     Doctor.findByIdAndDelete = jest.fn().mockResolvedValue({
//       _id: '507f1f77bcf86cd799439011',
//       firstName: 'John',
//       lastName: 'Doe'
//     });

//     await deleteDoctorDetails(request, response);

//     expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
//     expect(response.status).toHaveBeenCalledWith(200);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Doctor deleted successfully' });
//   });

//   it('should return 400 when doctorId is missing', async () => {
//     const badRequest = {
//       query: {}
//     };

//     await deleteDoctorDetails(badRequest, response);

//     expect(response.status).toHaveBeenCalledWith(400);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Missing required field doctorId' });
//   });

//   it('should return 404 when doctor is not found', async () => {
//     Doctor.findByIdAndDelete = jest.fn().mockResolvedValue(null);

//     await deleteDoctorDetails(request, response);

//     expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
//     expect(response.status).toHaveBeenCalledWith(404);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Doctor not found' });
//   });

//   it('should return 500 when database operation fails', async () => {
//     Doctor.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database error'));

//     await deleteDoctorDetails(request, response);

//     expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
//     expect(response.status).toHaveBeenCalledWith(500);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//   });
// });



// import { getPatientsByDoctor } from '../dashboard/application/dto/doctor.js';
// import Patient from '../infrastructure/schema/patient_schema.js';
// import Session from '../infrastructure/schema/sessions_schema.js';
// import Slot from '../infrastructure/schema/slots_schema.js';

// jest.mock('../infrastructure/schema/patient_schema.js');
// jest.mock('../infrastructure/schema/sessions_schema.js');
// jest.mock('../infrastructure/schema/slots_schema.js');

// const request = {
//   params: {
//     id: 'doctor123'
//   }
// };

// const response = {
//   status: jest.fn(() => response),
//   json: jest.fn((x) => x),
//   send: jest.fn((x) => x)
// };

// describe('Doctor API - Get Patients By Doctor', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return patients for a doctor successfully', async () => {
//     const mockPatients = [
//       { _id: 'patient1', firstName: 'Jane', lastName: 'Smith' }
//     ];
    
//     const mockSessions = [
//       { _id: 'session1', doctor: 'doctor123' },
//       { _id: 'session2', doctor: 'doctor123' }
//     ];
    
//     const mockBookedSlots = [
//       { 
//         _id: 'slot1', 
//         Session: 'session1', 
//         availability: false,
//         patient: {
//           _id: 'patient1',
//           firstName: 'Jane',
//           lastName: 'Smith',
//           patientId: 'P001',
//           email: 'jane@example.com',
//           contactNumber: '1234567890'
//         }
//       }
//     ];

//     Patient.find = jest.fn().mockResolvedValue(mockPatients);
    
//     Session.find = jest.fn().mockResolvedValue(mockSessions);
    
//     Slot.find = jest.fn().mockReturnValue({
//       populate: jest.fn().mockResolvedValue(mockBookedSlots)
//     });

//     await getPatientsByDoctor(request, response);

//     expect(Patient.find).toHaveBeenCalledWith({ doctors: 'doctor123' });
//     expect(Session.find).toHaveBeenCalledWith({ doctor: 'doctor123' });
//     expect(Slot.find).toHaveBeenCalledWith({ 
//       Session: { $in: ['session1', 'session2'] }, 
//       availability: false 
//     });
//     expect(response.status).toHaveBeenCalledWith(200);
//     expect(response.json).toHaveBeenCalledWith([mockBookedSlots[0].patient]);
//   });

//   it('should return 400 when doctor ID is missing', async () => {
//     const badRequest = {
//       params: {}
//     };

//     await getPatientsByDoctor(badRequest, response);

//     expect(response.status).toHaveBeenCalledWith(400);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Doctor ID is required' });
//   });

//   it('should return 404 when no patients are found', async () => {
//     Patient.find = jest.fn().mockResolvedValue([]);

//     await getPatientsByDoctor(request, response);

//     expect(Patient.find).toHaveBeenCalledWith({ doctors: 'doctor123' });
//     expect(response.status).toHaveBeenCalledWith(404);
//     expect(response.json).toHaveBeenCalledWith({ message: 'No patients found for this doctor' });
//   });

//   it('should return 404 when no sessions are found', async () => {
//     const mockPatients = [
//       { _id: 'patient1', firstName: 'Jane', lastName: 'Smith' }
//     ];
    
//     Patient.find = jest.fn().mockResolvedValue(mockPatients);
//     Session.find = jest.fn().mockResolvedValue([]);

//     await getPatientsByDoctor(request, response);

//     expect(Patient.find).toHaveBeenCalledWith({ doctors: 'doctor123' });
//     expect(Session.find).toHaveBeenCalledWith({ doctor: 'doctor123' });
//     expect(response.status).toHaveBeenCalledWith(404);
//     expect(response.json).toHaveBeenCalledWith({ message: 'No sessions found for this doctor' });
//   });

//   it('should return 404 when no booked slots are found', async () => {
//     const mockPatients = [
//       { _id: 'patient1', firstName: 'Jane', lastName: 'Smith' }
//     ];
    
//     const mockSessions = [
//       { _id: 'session1', doctor: 'doctor123' }
//     ];
    
//     Patient.find = jest.fn().mockResolvedValue(mockPatients);
//     Session.find = jest.fn().mockResolvedValue(mockSessions);
//     Slot.find = jest.fn().mockReturnValue({
//       populate: jest.fn().mockResolvedValue([])
//     });

//     await getPatientsByDoctor(request, response);

//     expect(Patient.find).toHaveBeenCalledWith({ doctors: 'doctor123' });
//     expect(Session.find).toHaveBeenCalledWith({ doctor: 'doctor123' });
//     expect(Slot.find).toHaveBeenCalledWith({ 
//       Session: { $in: ['session1'] }, 
//       availability: false 
//     });
//     expect(response.status).toHaveBeenCalledWith(404);
//     expect(response.json).toHaveBeenCalledWith({ message: 'No patients found for this doctor' });
//   });

//   it('should return 500 when database operation fails', async () => {
//     Patient.find = jest.fn().mockRejectedValue(new Error('Database error'));

//     await getPatientsByDoctor(request, response);

//     expect(Patient.find).toHaveBeenCalledWith({ doctors: 'doctor123' });
//     expect(response.status).toHaveBeenCalledWith(500);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//   });
// });


// import { addDoctorToPatient } from '../dashboard/application/dto/doctor.js';
// import Patient from '../infrastructure/schema/patient_schema.js';

// jest.mock('../infrastructure/schema/patient_schema.js');

// const request = {
//   body: {
//     patientId: 'patient123',
//     doctorId: 'doctor456'
//   }
// };

// const response = {
//   status: jest.fn(() => response),
//   json: jest.fn((x) => x),
//   send: jest.fn((x) => x)
// };

// describe('Doctor API - Add Doctor To Patient', () => {
//   it('should add doctor to patient successfully', async () => {
//     const mockUpdatedPatient = {
//       _id: 'patient123',
//       doctors: ['doctor456']
//     };

//     Patient.findByIdAndUpdate = jest.fn().mockReturnValue({
//       select: jest.fn().mockResolvedValue(mockUpdatedPatient)
//     });

//     await addDoctorToPatient(request, response);

//     expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
//       'patient123',
//       { $addToSet: { 'doctors': 'doctor456' } },
//       { new: true }
//     );
//     expect(response.status).toHaveBeenCalledWith(200);
//     expect(response.json).toHaveBeenCalledWith(mockUpdatedPatient);
//   });

//   it('should return 400 when patient ID or doctor ID is missing', async () => {
//     const badRequest = {
//       body: {
//         patientId: 'patient123'
//         // doctorId is missing
//       }
//     };

//     await addDoctorToPatient(badRequest, response);

//     expect(response.status).toHaveBeenCalledWith(400);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Patient ID and Doctor ID are required' });
//   });

//   it('should return 404 when patient is not found', async () => {
//     Patient.findByIdAndUpdate = jest.fn().mockReturnValue({
//       select: jest.fn().mockResolvedValue(null)
//     });

//     await addDoctorToPatient(request, response);

//     expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
//       'patient123',
//       { $addToSet: { 'doctors': 'doctor456' } },
//       { new: true }
//     );
//     expect(response.status).toHaveBeenCalledWith(404);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Patient not found' });
//   });

//   it('should return 500 when database operation fails', async () => {
//     Patient.findByIdAndUpdate = jest.fn().mockReturnValue({
//       select: jest.fn().mockRejectedValue(new Error('Database error'))
//     });

//     await addDoctorToPatient(request, response);

//     expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
//       'patient123',
//       { $addToSet: { 'doctors': 'doctor456' } },
//       { new: true }
//     );
//     expect(response.status).toHaveBeenCalledWith(500);
//     expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//   });
// });


// import { getActiveAppointmentsByDoctor } from '../dashboard/application/dto/doctor.js';
// import Session from '../infrastructure/schema/sessions_schema';
// import Slot from '../infrastructure/schema/slots_schema';

// jest.mock('../infrastructure/schema/sessions_schema');
// jest.mock('../infrastructure/schema/slots_schema');

// describe('getActiveAppointmentsByDoctor API', () => {
//   const req = { query: { doctorId: 'DR12345' } };
//   const res = {
//     status: jest.fn(() => res),
//     json: jest.fn((x) => x)
//   };

//   it('should return active appointments for a doctor', async () => {
//     // Mock session data
//     const mockSessions = [{ _id: 'session1' }];
//     Session.find = jest.fn().mockResolvedValue(mockSessions);
    
//     // Mock appointment data
//     const mockAppointments = [
//       {
//         patient: {
//           firstName: 'John',
//           lastName: 'Doe',
//           patientId: 'P12345'
//         },
//         startTime: new Date('2025-03-20T14:30:00')
//       }
//     ];
    
//     Slot.find = jest.fn().mockReturnValue({
//       populate: jest.fn().mockResolvedValue(mockAppointments)
//     });
    
//     await getActiveAppointmentsByDoctor(req, res);
    
//     expect(Session.find).toHaveBeenCalled();
//     expect(Slot.find).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalled();
//   });

//   it('should return 404 if no active sessions found', async () => {
//     Session.find = jest.fn().mockResolvedValue([]);
    
//     await getActiveAppointmentsByDoctor(req, res);
    
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'No active sessions found for this doctor' });
//   });

//   it('should return 400 if doctorId is missing', async () => {
//     const reqWithoutId = { query: {} };
    
//     await getActiveAppointmentsByDoctor(reqWithoutId, res);
    
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Doctor ID is required' });
//   });
// });



// const mongoose = require('mongoose');
// const { getTotalPatientCountByDoctor } = require('../dashboard/application/dto/doctor.js');
// const Session = require('../infrastructure/schema/sessions_schema');
// const Slot = require('../infrastructure/schema/slots_schema');

// Mock mongoose and models
// jest.mock('mongoose', () => {
//   const mockMongoose = {
//     Types: {
//       ObjectId: {
//         isValid: jest.fn()
//       }
//     },
//     Schema: function(obj) {
//       return obj;
//     }
//   };
  

//   mockMongoose.Schema.Types = {
//     ObjectId: mockMongoose.Types.ObjectId
//   };
  

//   mockMongoose.model = jest.fn().mockReturnValue({});
  
//   return mockMongoose;
// });

// jest.mock('../infrastructure/schema/sessions_schema');
// jest.mock('../infrastructure/schema/slots_schema');

// describe('getTotalPatientCountByDoctor API', () => {
//   let req, res;
  
//   beforeEach(() => {
//     req = {
//       query: {}
//     };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };
//     jest.clearAllMocks();
//   });

//   it('should return 400 if doctor ID is invalid', async () => {
//     req.query.doctorId = 'invalid-id';
//     mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    
//     await getTotalPatientCountByDoctor(req, res);
    
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalled();
//   });

// });

