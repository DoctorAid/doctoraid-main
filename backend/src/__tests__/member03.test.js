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

