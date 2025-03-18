// import { createRecord } from '../dashboard/application/dto/record.js';
// import Record from '../infrastructure/schema/records_schema.js';
// import Patient from '../infrastructure/schema/patient_schema.js';
// import Doctor from '../infrastructure/schema/doctor_schema.js';


// jest.mock('../infrastructure/schema/records_schema.js');
// jest.mock('../infrastructure/schema/patient_schema.js');
// jest.mock('../infrastructure/schema/doctor_schema.js');

// describe('Records API - createRecord', () => {
//   let req, res;

//   beforeEach(() => {
//     req = {
//       body: {
//         prescription: 'Take medication twice daily',
//         patientId: '60d5ec9af682fbd810d8bc8a',
//         doctorId: '60d5ec9af682fbd810d8bc8b',
//         observation: 'Patient shows improvement',
//         notes: 'Follow up in two weeks',
//         date: '2023-05-15'
//       }
//     };

//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn((x) => x),
//       send: jest.fn((x) => x)
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should create a record successfully', async () => {
//     // Mock implementation for checking if patient exists
//     Patient.findById = jest.fn().mockResolvedValue({ 
//       _id: '60d5ec9af682fbd810d8bc8a',
//       name: 'John Doe'
//     });

//     // Mock implementation for checking if doctor exists
//     Doctor.findById = jest.fn().mockResolvedValue({ 
//       _id: '60d5ec9af682fbd810d8bc8b',
//       name: 'Dr. Smith'
//     });

//     // Mock implementation for creating a new record
//     Record.mockImplementation(() => ({
//       save: jest.fn().mockResolvedValue({
//         _id: '60d5ec9af682fbd810d8bc8c',
//         ...req.body
//       })
//     }));

//     await createRecord(req, res);

//     expect(Patient.findById).toHaveBeenCalledWith(req.body.patientId);
//     expect(Doctor.findById).toHaveBeenCalledWith(req.body.doctorId);
//     expect(Record).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       _id: '60d5ec9af682fbd810d8bc8c',
//       ...req.body
//     });
//   });

//   it('should return 400 if required fields are missing', async () => {
//     // Test missing prescription
//     req.body.prescription = undefined;
    
//     await createRecord(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
//   });

//   it('should return 404 if patient is not found', async () => {
//     // Mock implementation for patient not found
//     Patient.findById = jest.fn().mockResolvedValue(null);
    
//     await createRecord(req, res);

//     expect(Patient.findById).toHaveBeenCalledWith(req.body.patientId);
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Patient not found' });
//   });

//   it('should return 404 if doctor is not found', async () => {
//     // Mock implementation for patient found but doctor not found
//     Patient.findById = jest.fn().mockResolvedValue({ 
//       _id: '60d5ec9af682fbd810d8bc8a',
//       name: 'John Doe'
//     });
//     Doctor.findById = jest.fn().mockResolvedValue(null);
    
//     await createRecord(req, res);

//     expect(Patient.findById).toHaveBeenCalledWith(req.body.patientId);
//     expect(Doctor.findById).toHaveBeenCalledWith(req.body.doctorId);
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Doctor not found' });
//   });

//   it('should return 500 if an error occurs', async () => {
//     // Mock implementation for an error
//     Patient.findById = jest.fn().mockImplementation(() => {
//       throw new Error('Database error');
//     });
    
//     console.error = jest.fn(); // Mock console.error to avoid test output noise
    
//     await createRecord(req, res);

//     expect(console.error).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//   });
// });



// import { updateRecord } from '../dashboard/application/dto/record.js';
// import Record from '../infrastructure/schema/records_schema.js'; 

// jest.mock('../infrastructure/schema/records_schema.js');

// const request = {
//     params: {
//         id: '12345', // Example record ID
//     },
//     body: {
//         prescription: 'New prescription',
//         observation: 'Updated observation',
//         notes: 'Some notes',
//         date: '2021-11-11',
//     }
// };

// const response = {
//     status: jest.fn(() => response),
//     json: jest.fn((x) => x),
//     send: jest.fn((x) => x),
// };

// describe('Update Record API', () => {
//     it('should update a record successfully', async () => {
//         // Mock the Record.findById and Record.findByIdAndUpdate methods
//         Record.findById.mockResolvedValue(request.body); // Simulate finding the record
//         Record.findByIdAndUpdate.mockResolvedValue({ ...request.body, updatedAt: new Date() }); // Simulate the updated record

//         await updateRecord(request, response);

//         expect(response.status).toHaveBeenCalledWith(200);
//         expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
//             prescription: 'New prescription',
//             observation: 'Updated observation',
//             notes: 'Some notes',
//             date: '2021-11-11',
//         }));
//     });

//     it('should return 404 if record is not found', async () => {
//         Record.findById.mockResolvedValue(null); // Simulate record not found

//         await updateRecord(request, response);

//         expect(response.status).toHaveBeenCalledWith(404);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Record not found' });
//     });

//     it('should return 400 for validation errors', async () => {
//         const error = new Error('Validation error');
//         error.name = 'ValidationError';
//         Record.findById.mockResolvedValue(request.body); // Simulate finding the record
//         Record.findByIdAndUpdate.mockRejectedValue(error); // Simulate a validation error

//         await updateRecord(request, response);

//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Validation error', details: error.message });
//     });

//     it('should return 400 for invalid record ID format', async () => {
//         const error = new Error('Cast error');
//         error.name = 'CastError';
//         Record.findById.mockResolvedValue(request.body); // Simulate finding the record
//         Record.findByIdAndUpdate.mockRejectedValue(error); // Simulate a cast error

//         await updateRecord(request, response);

//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Invalid record ID format' });
//     });

//     it('should return 500 for internal server errors', async () => {
//         const error = new Error('Internal server error');
//         Record.findById.mockResolvedValue(request.body); // Simulate finding the record
//         Record.findByIdAndUpdate.mockRejectedValue(error); // Simulate an internal server error

//         await updateRecord(request, response);

//         expect(response.status).toHaveBeenCalledWith(500);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//     });
// }); 


// import { getRecordById } from '../dashboard/application/dto/record.js';
// import Record from '../infrastructure/schema/records_schema.js'; 
// import mongoose from 'mongoose';

// jest.mock('../infrastructure/schema/records_schema.js');

// const request = {
//     query: {
//         id: '60d5ec49f1b2c8b1f8c8e4e1', // Example valid record ID
//     },
// };

// const response = {
//     status: jest.fn(() => response),
//     json: jest.fn((x) => x),
// };

// describe('Get Record by ID API', () => {
//     it('should return a record successfully', async () => {
//         const mockRecord = {
//             _id: request.query.id,
//             prescription: 'Sample prescription',
//             observation: 'Sample observation',
//             notes: 'Sample notes',
//             date: '2021-11-11',
//         };

//         Record.findOne.mockResolvedValue(mockRecord); // Simulate finding the record

//         await getRecordById(request, response);

//         expect(response.status).toHaveBeenCalledWith(200);
//         expect(response.json).toHaveBeenCalledWith(mockRecord);
//     });

//     it('should return 400 if record ID is not provided', async () => {
//         const requestWithoutId = { query: {} }; // No ID provided

//         await getRecordById(requestWithoutId, response);

//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Record ID is required' });
//     });

//     it('should return 400 if record ID format is invalid', async () => {
//         const requestWithInvalidId = {
//             query: {
//                 id: 'invalid-id', // Invalid ID format
//             },
//         };

//         await getRecordById(requestWithInvalidId, response);

//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Invalid record ID format' });
//     });

//     it('should return 404 if record is not found', async () => {
//         Record.findOne.mockResolvedValue(null); // Simulate record not found

//         await getRecordById(request, response);

//         expect(response.status).toHaveBeenCalledWith(404);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Record not found' });
//     });

//     it('should return 500 for internal server errors', async () => {
//         const error = new Error('Internal server error');
//         Record.findOne.mockRejectedValue(error); // Simulate an internal server error

//         await getRecordById(request, response);

//         expect(response.status).toHaveBeenCalledWith(500);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//     });
// });


// import { getRecordsByPatientandDoctor } from '../dashboard/application/dto/record.js';
// import Record from '../infrastructure/schema/records_schema.js'; 
// import mongoose from 'mongoose';

// jest.mock('../infrastructure/schema/records_schema.js');

// const request = {
//     query: {
//         patientId: '60d5ec49f1b2c8b1f8c8e4e1', // Example valid patient ID
//         doctorId: '60d5ec49f1b2c8b1f8c8e4e2', // Example valid doctor ID
//         page: '1',
//         limit: '10',
//     },
// };

// const response = {
//     status: jest.fn(() => response),
//     json: jest.fn((x) => x),
// };

// describe('Get Records by Patient and Doctor API', () => {
//     it('should return records successfully', async () => {
//         const mockRecords = [
//             {
//                 _id: '60d5ec49f1b2c8b1f8c8e4e3',
//                 patientId: request.query.patientId,
//                 doctorId: request.query.doctorId,
//                 prescription: 'Sample prescription',
//                 observation: 'Sample observation',
//                 notes: 'Sample notes',
//                 date: '2021-11-11',
//             },
//         ];

//         Record.find.mockReturnValue({
//             skip: jest.fn().mockReturnValue({
//                 limit: jest.fn().mockResolvedValue(mockRecords), // Simulate the records returned
//             }),
//         });

//         await getRecordsByPatientandDoctor(request, response);

//         expect(response.status).toHaveBeenCalledWith(200);
//         expect(response.json).toHaveBeenCalledWith(mockRecords);
//     });

//     it('should return 400 if patientId or doctorId is not provided', async () => {
//         const requestWithoutIds = { query: {} }; // No IDs provided

//         await getRecordsByPatientandDoctor(requestWithoutIds, response);

//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Patient ID and Doctor ID are required' });
//     });

//     it('should return 400 if patientId or doctorId format is invalid', async () => {
//         const requestWithInvalidId = {
//             query: {
//                 patientId: 'invalid-id', // Invalid patient ID format
//                 doctorId: '60d5ec49f1b2c8b1f8c8e4e2', // Valid doctor ID
//             },
//         };

//         await getRecordsByPatientandDoctor(requestWithInvalidId, response);

//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Invalid patient or doctor ID format' });
//     });

//     it('should return 500 for internal server errors', async () => {
//         const error = new Error('Internal server error');
//         Record.find.mockImplementation(() => {
//             throw error; // Simulate an internal server error
//         });

//         await getRecordsByPatientandDoctor(request, response);

//         expect(response.status).toHaveBeenCalledWith(500);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//     });
// });


import { getRecordsByPatient } from '../dashboard/application/dto/record.js';
import Record from '../infrastructure/schema/records_schema.js'; 
import mongoose from 'mongoose';

jest.mock('../infrastructure/schema/records_schema.js');

const request = {
    query: {
        patientId: '60d5ec49f1b2c8b1f8c8e4e1', // Example valid patient ID
        page: '1',
        limit: '10',
    },
};

const response = {
    status: jest.fn(() => response),
    json: jest.fn((x) => x),
};

describe('Get Records by Patient API', () => {
    it('should return records successfully', async () => {
        const mockRecords = [
            {
                _id: '60d5ec49f1b2c8b1f8c8e4e3',
                patientId: request.query.patientId,
                prescription: 'Sample prescription',
                observation: 'Sample observation',
                notes: 'Sample notes',
                date: '2021-11-11',
            },
        ];

        Record.find.mockReturnValue({
            sort: jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockResolvedValue(mockRecords), // Simulate the records returned
                }),
            }),
        });

        Record.countDocuments.mockResolvedValue(mockRecords.length); // Simulate total count

        await getRecordsByPatient(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            records: mockRecords,
            pagination: {
                totalRecords: mockRecords.length,
                totalPages: 1,
                currentPage: 1,
                limit: 10,
            },
        });
    });

    it('should return 400 if patientId is not provided', async () => {
        const requestWithoutId = { query: {} }; // No patientId provided

        await getRecordsByPatient(requestWithoutId, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: 'Patient ID is required' });
    });

    it('should return 400 if patientId format is invalid', async () => {
        const requestWithInvalidId = {
            query: {
                patientId: 'invalid-id', // Invalid patient ID format
            },
        };

        await getRecordsByPatient(requestWithInvalidId, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: 'Invalid patient ID format' });
    });

    it('should return 500 for internal server errors', async () => {
        const error = new Error('Internal server error');
        Record.find.mockImplementation(() => {
            throw error; // Simulate an internal server error
        });

        await getRecordsByPatient(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});