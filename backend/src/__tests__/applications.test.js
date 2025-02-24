import { getSessions, createSession } from '../dashboard/application/dto/sessions.js';
import Session from '../infrastructure/schema/sessions_schema.js';

jest.mock('../infrastructure/schema/sessions_schema.js');

const request = {
    body: {
        date: '2021-11-11',
        time: '12:00',
        duration: 2,
    }
}

const response = {
    status: jest.fn(() => response),
    json: jest.fn((x) => x),
    send: jest.fn((x)=>x)
}

describe('Sessions API', () => {
    it('should create a session', async () => {
        Session.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(request.body),
        }));
        await createSession(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        
    });

    // it('should get sessions', async () => {
    //     Session.find.mockResolvedValue([
    //         {
    //             id: 1,
    //             email: "ww"
    //         }
    //     ]);

    //     await getSessions(request, response);

    //     expect(response.status).toHaveBeenCalledWith(200);
    //     expect(response.json).toHaveBeenCalledWith([{ id: 1, email: "ww" }]);
    // });

});
