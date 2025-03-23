// import { createPatients } from '../dashboard/application/dto/patient.js';
// import Patient from '../infrastructure/schema/patient_schema.js';
// import Family from '../infrastructure/schema/family_schema.js';
// import mongoose from 'mongoose';

 // Mock the required modules
// jest.mock('../infrastructure/schema/patient_schema.js');
// jest.mock('../infrastructure/schema/family_schema.js');
// jest.mock('mongoose', () => {
//     const originalMongoose = jest.requireActual('mongoose');
//     return {
//         ...originalMongoose,
//         Types: {
//             ObjectId: jest.fn().mockImplementation(() => ({
//                 toString: () => 'mockObjectId1234'
//             }))
//         }
//     };
// });

// describe('Patient API', () => {
//     let request;
//     let response;

//     beforeEach(() => {
//         // Setup mock request with patient data
//         request = {
//             body: {
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 dateOfBirth: '1990-01-01',
//                 gender: 'Male',
//                 patientId: 'PT1234',
//                 contactNumber: '1234567890',
//                 email: 'john.doe@example.com',
//                 address: {
//                     line1: '123 Main St',
//                     line2: 'Apt 4B',
//                     city: 'New York'
//                 },
//                 weight: 70,
//                 height: 175,
//                 relation: 'Father',
//                 clerkId: 'clerk123'
//             }
//         };

//         // Setup mock response
//         response = {
//             status: jest.fn(() => response),
//             json: jest.fn((x) => x),
//             send: jest.fn((x) => x)
//         };

//         // Reset all mocks
//         jest.clearAllMocks();
//     });

//     it('should create a patient and family successfully', async () => {
//         // Mock Patient findOne to return null (no existing patient)
//         Patient.findOne = jest.fn().mockResolvedValue(null);

//         // Mock Patient constructor and save method
//         Patient.mockImplementation(() => ({
//             _id: 'mockPatientId',
//             save: jest.fn().mockResolvedValue({
//                 _id: 'mockPatientId',
//                 ...request.body
//             })
//         }));

//         // Mock Family constructor and save method
//         const mockFamilyId = 'FM1234';
//         Family.mockImplementation(() => ({
//             _id: 'mockFamilyId',
//             save: jest.fn().mockResolvedValue({
//                 _id: 'mockFamilyId',
//                 familyId: mockFamilyId
//             })
//         }));

//         // Mock Family findByIdAndUpdate method
//         Family.findByIdAndUpdate = jest.fn().mockResolvedValue({
//             _id: 'mockFamilyId',
//             familyId: mockFamilyId,
//             members: [{ patient: 'mockPatientId', relation: 'Father' }]
//         });

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 201 (Created)
//         expect(response.status).toHaveBeenCalledWith(201);
        
//         // Expect response to include success message and data
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: "Patient and family created successfully",
//                 patient: expect.any(Object),
//                 family: expect.objectContaining({
//                     familyId: expect.any(String)
//                 })
//             })
//         );
//     });

//     it('should return 400 if required fields are missing', async () => {
//         // Remove required field
//         request.body.firstName = undefined;

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 400
//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: "All required fields must be provided."
//             })
//         );
//     });

//     it('should return 400 if address fields are missing', async () => {
//         // Remove required address field
//         request.body.address.city = undefined;

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 400
//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: "Address line 1 and city are required."
//             })
//         );
//     });

//     it('should return 400 if gender is invalid', async () => {
//         // Set invalid gender
//         request.body.gender = 'InvalidGender';

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 400
//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: "Invalid gender value."
//             })
//         );
//     });

//     it('should return 400 if email already exists', async () => {
//         // Mock Patient findOne to return an existing patient
//         Patient.findOne = jest.fn().mockResolvedValue({ email: request.body.email });

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 400
//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: "A patient with this email already exists."
//             })
//         );
//     });

//     it('should return 400 if relation is invalid', async () => {
//         // Set invalid relation
//         request.body.relation = 'InvalidRelation';
        
//         // Mock Patient findOne to return null (no existing patient)
//         Patient.findOne = jest.fn().mockResolvedValue(null);

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 400
//         expect(response.status).toHaveBeenCalledWith(400);
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: "Invalid relation value."
//             })
//         );
//     });

//     it('should return 500 if an error occurs', async () => {
//         // Mock Patient findOne to throw an error
//         Patient.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

//         // Call the function
//         await createPatients(request, response);

//         // Expect response status to be 500
//         expect(response.status).toHaveBeenCalledWith(500);
//         expect(response.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 message: 'Internal server error',
//                 error: 'Database error'
//             })
//         );
//     });
// });

//import { addPatient } from '../dashboard/application/dto/patient.js';
//import Patient from '../infrastructure/schema/patient_schema.js';
//import Family from '../infrastructure/schema/family_schema.js';

// Mock the required modules
//jest.mock('../infrastructure/schema/patient_schema.js');
//jest.mock('../infrastructure/schema/family_schema.js');

//describe('Add Patient API', () => {
//    let request;
//    let response;

//    beforeEach(() => {
        // Setup mock request with patient data
//        request = {
//            body: {
//                firstName: 'Jane',
//                lastName: 'Doe',
//                dateOfBirth: '1992-01-01',
//                gender: 'Female',
//                patientId: 'PT5678',
//                contactNumber: '9876543210',
//                email: 'jane.doe@example.com',
//                address: {
                    // line1: '456 Main St',
                    // line2: 'Apt 7C',
                    // city: 'Chicago'
//                },
//                weight: 65,
    //             height: 168,
    //             relation: 'Wife',
    //             familyId: 'FM1234'
    //         }
    //     };

    //     // Setup mock response
    //     response = {
    //         status: jest.fn(() => response),
    //         json: jest.fn((x) => x),
    //         send: jest.fn((x) => x)
    //     };

    //     // Reset all mocks
    //     jest.clearAllMocks();
    // });

    // it('should add a patient to an existing family successfully', async () => {
    //     // Mock Patient findOne to return null (no existing patient with email)
    //     Patient.findOne = jest.fn().mockResolvedValue(null);

    //     // Mock Family findOne to return an existing family
    //     Family.findOne = jest.fn().mockResolvedValue({
    //         _id: 'mockFamilyId',
    //         familyId: 'FM1234',
    //         members: []
    //     });

    //     // Mock Patient constructor and save method
    //     Patient.mockImplementation(() => ({
    //         _id: 'mockPatientId',
    //         save: jest.fn().mockResolvedValue({
    //             _id: 'mockPatientId',
    //             ...request.body
    //         })
    //     }));

    //     // Mock Family findByIdAndUpdate method
    //     Family.findByIdAndUpdate = jest.fn().mockResolvedValue({
    //         _id: 'mockFamilyId',
    //         familyId: 'FM1234',
    //         members: [{ patient: 'mockPatientId', relation: 'Wife' }]
    //     });

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 201 (Created)
    //     expect(response.status).toHaveBeenCalledWith(201);
        
    //     // Expect response to include success message and data
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "Patient added successfully to existing family",
    //             patient: expect.any(Object)
    //         })
    //     );
    // });

    // it('should return 400 if required fields are missing', async () => {
    //     // Remove required field
    //     request.body.firstName = undefined;

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 400
    //     expect(response.status).toHaveBeenCalledWith(400);
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "All required fields must be provided."
    //         })
    //     );
    // });

    // it('should return 400 if address fields are missing', async () => {
    //     // Remove required address field
    //     request.body.address.city = undefined;

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 400
    //     expect(response.status).toHaveBeenCalledWith(400);
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "Address line 1 and city are required."
    //         })
    //     );
    // });

    // it('should return 400 if gender is invalid', async () => {
    //     // Set invalid gender
    //     request.body.gender = 'InvalidGender';

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 400
    //     expect(response.status).toHaveBeenCalledWith(400);
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "Invalid gender value."
    //         })
    //     );
    // });

    // it('should return 400 if email already exists', async () => {
    //     // Mock Patient findOne to return an existing patient
    //     Patient.findOne = jest.fn().mockResolvedValue({ email: request.body.email });

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 400
    //     expect(response.status).toHaveBeenCalledWith(400);
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "A patient with this email already exists."
    //         })
    //     );
    // });

    // it('should return 400 if relation is invalid', async () => {
    //     // Set invalid relation
    //     request.body.relation = 'InvalidRelation';
        
    //     // Mock Patient findOne to return null (no existing patient)
    //     Patient.findOne = jest.fn().mockResolvedValue(null);

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 400
    //     expect(response.status).toHaveBeenCalledWith(400);
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "Invalid relation value."
    //         })
    //     );
    // });

//    it('should return 404 if family is not found', async () => {
        // Mock Patient findOne to return null (no existing patient)
//        Patient.findOne = jest.fn().mockResolvedValue(null);
        
        // Mock Family findOne to return null (family not found)
    //     Family.findOne = jest.fn().mockResolvedValue(null);

    //     // Call the function
    //     await addPatient(request, response);

    //     // Expect response status to be 404
    //     expect(response.status).toHaveBeenCalledWith(404);
    //     expect(response.json).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message: "Family not found."
    //         })
    //     );
    // });

//    it('should return 500 if an error occurs', async () => {
//        // Mock Patient findOne to throw an error
//        Patient.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        // Call the function
//        await addPatient(request, response);

        // Expect response status to be 500
//        expect(response.status).toHaveBeenCalledWith(500);
//        expect(response.json).toHaveBeenCalledWith(
//            expect.objectContaining({
//                message: 'Internal server error',
//                error: 'Database error'
//            })
//        );
//    });
//});

// src/__tests__/member03.test.js

// First, mock ALL schema files before importing anything else
// jest.mock('../infrastructure/schema/patient_schema.js', () => ({
//     __esModule: true,
//     default: {
//       findById: jest.fn(),
//       findOne: jest.fn(),
//       findByIdAndUpdate: jest.fn()
//     }
//   }));
  
//   jest.mock('../infrastructure/schema/family_schema.js', () => ({
//     __esModule: true,
//     default: {
//       findOne: jest.fn(),
//       findByIdAndUpdate: jest.fn()
//     }
//   }));
  
//   jest.mock('../infrastructure/schema/records_schema.js', () => ({
//     __esModule: true,
//     default: {
//       find: jest.fn(),
//       findById: jest.fn(),
//       findByIdAndUpdate: jest.fn()
//     }
//   }));
  
//   jest.mock('../infrastructure/schema/doctor_schema.js', () => ({
//     __esModule: true,
//     default: {
//       find: jest.fn(),
//       findById: jest.fn()
//     }
//   }));
  
//   jest.mock('../infrastructure/schema/slots_schema.js', () => ({
//     __esModule: true,
//     default: {
//       find: jest.fn(),
//       findById: jest.fn()
//     }
//   }));
  
//   jest.mock('../infrastructure/schema/sessions_schema.js', () => ({
//     __esModule: true,
//     default: {
//       find: jest.fn(),
//       findById: jest.fn()
//     }
//   }));
  
//   // Mock mongoose with a more complete structure
//   jest.mock('mongoose', () => ({
//     Schema: jest.fn(),
//     model: jest.fn(),
//     Types: {
//       ObjectId: {
//         isValid: jest.fn()
//       }
//     }
//   }));
  
//   // Now import the modules
//   import { updatePatient } from '../dashboard/application/dto/patient.js';
//   import Patient from '../infrastructure/schema/patient_schema.js';
//   import mongoose from 'mongoose';
  
//   describe('Update Patient API', () => {
//     let request;
//     let response;
  
//     beforeEach(() => {
//       // Setup mock request with patient ID and update data
//       request = {
//         params: { id: 'validObjectId' },
//         body: {
//           firstName: 'Jane',
//           lastName: 'Smith',
//           dateOfBirth: '1990-01-01',
//           gender: 'Female',
//           contactNumber: '1234567890',
//           email: 'jane.smith@example.com',
//           address: {
//             line1: '123 Main St',
//             line2: 'Apt 4B',
//             city: 'New York'
//           },
//           weight: 65,
//           height: 170
//         }
//       };
  
//       // Setup mock response
//       response = {
//         status: jest.fn(() => response),
//         json: jest.fn((x) => x)
//       };
  
//       // Clear mocks before each test
//       jest.clearAllMocks();
//     });
  
//     it('should update a patient successfully', async () => {
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock existing patient
//       const existingPatient = {
//         _id: 'validObjectId',
//         firstName: 'Jane',
//         lastName: 'Doe',
//         email: 'jane.doe@example.com',
//         address: {
//           line1: '456 Oak St',
//           line2: 'Apt 2C',
//           city: 'Chicago'
//         }
//       };
//       Patient.findById.mockResolvedValue(existingPatient);
      
//       // Mock no duplicate email
//       Patient.findOne.mockResolvedValue(null);
      
//       // Mock updated patient
//       const updatedPatient = {
//         ...existingPatient,
//         ...request.body,
//         email: request.body.email.toLowerCase()
//       };
//       Patient.findByIdAndUpdate.mockResolvedValue(updatedPatient);
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(200);
//       expect(response.json).toHaveBeenCalledWith({
//         message: "Patient updated successfully",
//         patient: updatedPatient
//       });
//       expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
//         request.params.id,
//         { $set: expect.any(Object) },
//         { new: true }
//       );
//     });
  
//     it('should return 400 if ID is invalid', async () => {
//       // Mock invalid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(false);
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(400);
//       expect(response.json).toHaveBeenCalledWith({
//         message: "Valid patient ID is required."
//       });
//     });
  
//     it('should return 404 if patient not found', async () => {
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock patient not found
//       Patient.findById.mockResolvedValue(null);
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(404);
//       expect(response.json).toHaveBeenCalledWith({
//         message: "Patient not found."
//       });
//     });
  
//     it('should return 400 if email already exists', async () => {
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock existing patient
//       const existingPatient = {
//         _id: 'validObjectId',
//         email: 'jane.doe@example.com'
//       };
//       Patient.findById.mockResolvedValue(existingPatient);
      
//       // Mock duplicate email
//       Patient.findOne.mockResolvedValue({ _id: 'anotherId', email: request.body.email.toLowerCase() });
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(400);
//       expect(response.json).toHaveBeenCalledWith({
//         message: "A patient with this email already exists."
//       });
//     });
  
//     it('should return 400 if gender is invalid', async () => {
//       // Set invalid gender
//       request.body.gender = 'InvalidGender';
      
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock existing patient with the SAME email as in the request
//       // This prevents the email validation from triggering first
//       const existingPatient = {
//         _id: 'validObjectId',
//         email: request.body.email.toLowerCase()
//       };
//       Patient.findById.mockResolvedValue(existingPatient);
      
//       // Make sure email check passes by returning null for findOne
//       Patient.findOne.mockResolvedValue(null);
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(400);
//       expect(response.json).toHaveBeenCalledWith({
//         message: "Invalid gender value."
//       });
//     });
  
//     it('should only update provided fields', async () => {
//       // Only provide firstName and weight
//       request.body = {
//         firstName: 'Updated',
//         weight: 70
//       };
      
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock existing patient
//       const existingPatient = {
//         _id: 'validObjectId',
//         firstName: 'Jane',
//         lastName: 'Doe',
//         email: 'jane.doe@example.com',
//         weight: 65,
//         height: 170,
//         address: {
//           line1: '456 Oak St',
//           line2: 'Apt 2C',
//           city: 'Chicago'
//         }
//       };
//       Patient.findById.mockResolvedValue(existingPatient);
      
//       // Mock updated patient
//       const updatedPatient = {
//         ...existingPatient,
//         firstName: 'Updated',
//         weight: 70
//       };
//       Patient.findByIdAndUpdate.mockResolvedValue(updatedPatient);
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(200);
//       expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
//         request.params.id,
//         { $set: { firstName: 'Updated', weight: 70 } },
//         { new: true }
//       );
//     });
  
//     it('should update address fields correctly', async () => {
//       // Create update with only address fields
//       request.body = {
//         address: {
//           line1: 'New Address Line',
//           city: 'New City'
//         }
//       };
      
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock existing patient
//       const existingPatient = {
//         _id: 'validObjectId',
//         firstName: 'Jane',
//         lastName: 'Doe',
//         email: 'jane.doe@example.com',
//         address: {
//           line1: '123 Main St',
//           line2: 'Apt 5B',
//           city: 'New York'
//         }
//       };
      
//       Patient.findById.mockResolvedValue(existingPatient);
      
//       // Expected update object for address
//       const expectedAddress = {
//         line1: 'New Address Line',
//         line2: 'Apt 5B', // Should keep existing line2
//         city: 'New City'
//       };
      
//       // Mock updated patient
//       const updatedPatient = {
//         ...existingPatient,
//         address: expectedAddress
//       };
//       Patient.findByIdAndUpdate.mockResolvedValue(updatedPatient);
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Verify that findByIdAndUpdate was called with the correct address update
//       expect(Patient.findByIdAndUpdate).toHaveBeenCalledWith(
//         request.params.id,
//         { $set: { address: expectedAddress } },
//         { new: true }
//       );
//     });
  
//     it('should handle server errors', async () => {
//       // Mock valid ObjectId
//       mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      
//       // Mock database error
//       Patient.findById.mockRejectedValue(new Error('Database error'));
      
//       // Call function
//       await updatePatient(request, response);
      
//       // Assertions
//       expect(response.status).toHaveBeenCalledWith(500);
//       expect(response.json).toHaveBeenCalledWith({
//         message: 'Internal server error',
//         error: 'Database error'
//       });
//     });
//   });

// import { getNearbyDoctors } from '../dashboard/application/dto/doctors.js';
// import Patient from '../infrastructure/schema/patient_schema.js';
// import Doctor from '../infrastructure/schema/doctor_schema.js';
// import mongoose from 'mongoose';

// // Mock the required modules
// jest.mock('../infrastructure/schema/patient_schema.js');
// jest.mock('../infrastructure/schema/doctor_schema.js');
// jest.mock('mongoose', () => ({
//   Types: {
//     ObjectId: {
//       isValid: jest.fn()
//     }
//   }
// }));

// describe('Doctor API - Get Nearby Doctors', () => {
//   let req, res;

//   beforeEach(() => {
//     // Reset mocks
//     jest.clearAllMocks();

//     // Mock request and response
//     req = {
//       params: {
//         id: '507f1f77bcf86cd799439011'
//       }
//     };

//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn((x) => x)
//     };

//     // Set default for ObjectId.isValid
//     mongoose.Types.ObjectId.isValid.mockReturnValue(true);
//   });

//   it('should get nearby doctors successfully', async () => {
//     // Mock patient data
//     const patientData = {
//       _id: '507f1f77bcf86cd799439011',
//       firstName: 'John',
      
//       lastName: 'Doe',
//       address: {
//         city: 'New York'
//       }
//     };

//     // Mock doctor data
//     const doctorsData = [
//       {
//         _id: '507f1f77bcf86cd799439022',
//         firstName: 'Jane',
//         lastName: 'Smith',
//         specialization: 'Cardiology',
//         hospital: 'NY General Hospital',
//         address: {
//           city: 'New York'
//         },
//         contactNumber: '1234567890',
//         email: 'jane.smith@example.com'
//       },
//       {
//         _id: '507f1f77bcf86cd799439033',
//         firstName: 'Mike',
//         lastName: 'Johnson',
//         specialization: 'Pediatrics',
//         hospital: 'Children\'s Hospital',
//         ppLocation: 'New York Downtown',
//         contactNumber: '9876543210',
//         email: 'mike.johnson@example.com'
//       }
//     ];

//     // Mock the Patient.findById
//     Patient.findById = jest.fn().mockResolvedValue(patientData);

//     // Mock the Doctor.find and select
//     Doctor.find = jest.fn().mockReturnValue({
//       select: jest.fn().mockResolvedValue(doctorsData)
//     });

//     // Call the function
//     await getNearbyDoctors(req, res);

//     // Check if Patient.findById was called with the correct id
//     expect(Patient.findById).toHaveBeenCalledWith(req.params.id);

//     // Check if Doctor.find was called with the correct query
//     expect(Doctor.find).toHaveBeenCalledWith({
//       $or: [
//         { "address.city": { $regex: expect.any(RegExp) }},
//         { "ppLocation": { $regex: expect.any(RegExp) }}
//       ]
//     });

//     // Check final response
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: `Found ${doctorsData.length} doctors near ${patientData.address.city}`,
//       patientCity: patientData.address.city,
//       doctors: doctorsData
//     });
//   });

//   it('should return 400 if patient ID is invalid', async () => {
//     // Mock invalid ObjectId
//     mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    
//     // Call the function
//     await getNearbyDoctors(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Valid patient ID is required."
//     });
//   });

//   it('should return 404 if patient is not found', async () => {
//     // Mock Patient.findById to return null
//     Patient.findById = jest.fn().mockResolvedValue(null);
    
//     // Call the function
//     await getNearbyDoctors(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Patient not found."
//     });
//   });

//   it('should return 500 if there is a server error', async () => {
//     // Mock Patient.findById to throw an error
//     Patient.findById = jest.fn().mockRejectedValue(new Error('Database error'));
    
//     // Mock console.error to prevent test output pollution
//     console.error = jest.fn();
    
//     // Call the function
//     await getNearbyDoctors(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'Internal server error',
//       error: 'Database error'
//     });
//   });
// });

// import { bookSlot } from '../dashboard/application/dto/slots.js';
// import Slot from '../infrastructure/schema/slots_schema.js';
// import Patient from '../infrastructure/schema/patient_schema.js';
// import Family from '../infrastructure/schema/family_schema.js';
// import mongoose from 'mongoose';

// // Mock the required modules
// jest.mock('../infrastructure/schema/slots_schema.js');
// jest.mock('../infrastructure/schema/patient_schema.js');
// jest.mock('../infrastructure/schema/family_schema.js');
// jest.mock('mongoose', () => {
//   const mockModel = jest.fn(() => ({
//     findById: jest.fn().mockResolvedValue({
//       _id: 'session123',
//       date: '2023-05-15',
//       doctorId: 'doctor123'
//     })
//   }));
  
//   return {
//     Types: {
//       ObjectId: {
//         isValid: jest.fn()
//       }
//     },
//     model: mockModel
//   };
// });

// describe('Slots API - Book Slot', () => {
//   let req, res;

//   beforeEach(() => {
//     // Reset mocks
//     jest.clearAllMocks();

//     // Mock request and response
//     req = {
//       params: {
//         slotId: '507f1f77bcf86cd799439011'
//       },
//       body: {
//         patientId: '507f1f77bcf86cd799439022',
//         familyId: '507f1f77bcf86cd799439033',
//         note: 'First consultation'
//       }
//     };

//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn((x) => x)
//     };

//     // Set default for ObjectId.isValid
//     mongoose.Types.ObjectId.isValid.mockReturnValue(true);
//   });

//   it('should book a slot successfully', async () => {
//     // Mock slot data
//     const slotData = {
//       _id: '507f1f77bcf86cd799439011',
//       startTime: '10:00',
//       endTime: '10:30',
//       duration: 30,
//       status: 'available',
//       Session: 'session123'
//     };

//     // Mock patient data
//     const patientData = {
//       _id: '507f1f77bcf86cd799439022',
//       firstName: 'John',
//       lastName: 'Doe'
//     };

//     // Mock family data
//     const familyData = {
//       _id: '507f1f77bcf86cd799439033'
//     };

//     // Mock updated slot data
//     const updatedSlotData = {
//       ...slotData,
//       status: 'booked',
//       patientId: req.body.patientId,
//       familyId: req.body.familyId,
//       patientNote: req.body.note,
//       patientName: `${patientData.firstName} ${patientData.lastName}`
//     };

//     // Mock the Slot.findById
//     Slot.findById = jest.fn().mockResolvedValue(slotData);

//     // Mock the Patient.findById
//     Patient.findById = jest.fn().mockResolvedValue(patientData);

//     // Mock the Family.findById
//     Family.findById = jest.fn().mockResolvedValue(familyData);

//     // Mock the Slot.findByIdAndUpdate
//     Slot.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedSlotData);

//     // Call the function
//     await bookSlot(req, res);

//     // Check if Slot.findById was called with the correct id
//     expect(Slot.findById).toHaveBeenCalledWith(req.params.slotId);

//     // Check if Patient.findById was called with the correct id
//     expect(Patient.findById).toHaveBeenCalledWith(req.body.patientId);

//     // Check if Family.findById was called with the correct id
//     expect(Family.findById).toHaveBeenCalledWith(req.body.familyId);

//     // Check if Slot.findByIdAndUpdate was called with the correct parameters
//     expect(Slot.findByIdAndUpdate).toHaveBeenCalledWith(
//       req.params.slotId,
//       {
//         status: 'booked',
//         patientId: req.body.patientId,
//         familyId: req.body.familyId,
//         patientNote: req.body.note,
//         patientName: `${patientData.firstName} ${patientData.lastName}`
//       },
//       { new: true, runValidators: true }
//     );

//     // Check if mongoose.model('Session').findById was called with the correct id
//     expect(mongoose.model).toHaveBeenCalledWith('Session');

//     // Check final response
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: "Appointment booked successfully",
//       data: {
//         appointmentId: updatedSlotData._id,
//         date: '2023-05-15',
//         startTime: updatedSlotData.startTime,
//         endTime: updatedSlotData.endTime,
//         duration: updatedSlotData.duration,
//         patientName: updatedSlotData.patientName,
//         patientId: updatedSlotData.patientId,
//         familyId: updatedSlotData.familyId,
//         note: updatedSlotData.patientNote,
//         doctorId: 'doctor123'
//       }
//     });
//   });

//   it('should return 400 if patientId or familyId is missing', async () => {
//     // Remove required fields
//     req.body = { patientId: '507f1f77bcf86cd799439022' };
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "Patient ID and Family ID are required."
//     });
//   });

//   it('should return 400 if any ID has invalid format', async () => {
//     // Mock invalid ObjectId
//     mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "Invalid ID format. All IDs must be valid MongoDB ObjectIDs."
//     });
//   });

//   it('should return 404 if slot is not found', async () => {
//     // Mock Slot.findById to return null
//     Slot.findById = jest.fn().mockResolvedValue(null);
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "Slot not found."
//     });
//   });

//   it('should return 400 if slot is already booked', async () => {
//     // Mock slot that is already booked
//     const bookedSlot = {
//       _id: '507f1f77bcf86cd799439011',
//       status: 'booked'
//     };
    
//     Slot.findById = jest.fn().mockResolvedValue(bookedSlot);
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "This slot is already booked."
//     });
//   });

//   it('should return 404 if patient is not found', async () => {
//     // Mock available slot
//     const slotData = {
//       _id: '507f1f77bcf86cd799439011',
//       status: 'available'
//     };
    
//     Slot.findById = jest.fn().mockResolvedValue(slotData);
    
//     // Mock Patient.findById to return null
//     Patient.findById = jest.fn().mockResolvedValue(null);
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "Patient not found."
//     });
//   });

//   it('should return 404 if family is not found', async () => {
//     // Mock available slot
//     const slotData = {
//       _id: '507f1f77bcf86cd799439011',
//       status: 'available'
//     };
    
//     // Mock patient data
//     const patientData = {
//       _id: '507f1f77bcf86cd799439022',
//       firstName: 'John',
//       lastName: 'Doe'
//     };
    
//     Slot.findById = jest.fn().mockResolvedValue(slotData);
//     Patient.findById = jest.fn().mockResolvedValue(patientData);
    
//     // Mock Family.findById to return null
//     Family.findById = jest.fn().mockResolvedValue(null);
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "Family not found."
//     });
//   });

//   it('should return 500 if slot update fails', async () => {
//     // Mock available slot
//     const slotData = {
//       _id: '507f1f77bcf86cd799439011',
//       status: 'available',
//       Session: 'session123'
//     };
    
//     // Mock patient data
//     const patientData = {
//       _id: '507f1f77bcf86cd799439022',
//       firstName: 'John',
//       lastName: 'Doe'
//     };
    
//     // Mock family data
//     const familyData = {
//       _id: '507f1f77bcf86cd799439033'
//     };
    
//     Slot.findById = jest.fn().mockResolvedValue(slotData);
//     Patient.findById = jest.fn().mockResolvedValue(patientData);
//     Family.findById = jest.fn().mockResolvedValue(familyData);
    
//     // Mock Slot.findByIdAndUpdate to return null
//     Slot.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: "Failed to update slot."
//     });
//   });

//   it('should return 500 if there is a server error', async () => {
//     // Mock Slot.findById to throw an error
//     Slot.findById = jest.fn().mockRejectedValue(new Error('Database error'));
    
//     // Mock console.error to prevent test output pollution
//     console.error = jest.fn();
    
//     // Call the function
//     await bookSlot(req, res);
    
//     // Check response
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Internal server error',
//       error: 'Database error'
//     });
//   });
// });


