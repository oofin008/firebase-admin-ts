jest.mock('../../core/services/adminService');
jest.mock('firebase-admin');

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import AdminService from '../../core/services/adminService';
import { setAdminRole } from '../../apis';

const mockAdminService = jest.mocked(AdminService);
const mockAdmin = jest.mocked(admin);

describe('Given setAdminRole is called', () => {
  beforeEach(() => {
    mockAdmin.auth = jest.fn();
    mockAdmin.firestore = jest.fn() as any;
  });

  afterEach(() => {
    mockAdminService.mockClear();
  });

  describe('When call with invalid request body', () => {
    it('Then return 401 If no auth header', async () => {
      mockAdminService.mockImplementation((_auth, _firestore) => {
        return { setRole: jest.fn() } as any;
      });
      const requestInput = {
        headers: {
          "x-api-key": '',
        },
      } as unknown as functions.https.Request;
      const mockResponse = {
        status: (code: number) => {
          expect(code).toBe(401);
          return {
            json: jest.fn(),
          };
        },
      } as any;

      await setAdminRole(requestInput, mockResponse);
    });

    it('Then return 400 If no request body', async () => {
      mockAdminService.mockImplementation((_auth, _firestore) => {
        return { setRole: jest.fn() } as any;
      });
      const requestInput = {
        headers: {
          "x-api-key": 'S@nti-1995',
        },
      } as unknown as functions.https.Request;
      const mockResponse = {
        status: (code: number) => {
          expect(code).toBe(400);
          return {
            json: jest.fn(),
          };
        },
      } as any;

      await setAdminRole(requestInput, mockResponse);
    });

    it('Then return 400 If no uid in request body', async () => {
      mockAdminService.mockImplementation((_auth, _firestore) => {
        return { setRole: jest.fn() } as any;
      });
      const requestInput = {
        headers: {
          "x-api-key": 'S@nti-1995',
        },
        body: {},
      } as unknown as functions.https.Request;
      const mockResponse = {
        status: (code: number) => {
          expect(code).toBe(400);
          return {
            json: jest.fn(),
          };
        },
      } as any;

      await setAdminRole(requestInput, mockResponse);
    });
  });

  describe('When call with correct body', () => {
    it('Then return 500 If setAdminRole failed', async () => {
      mockAdminService.mockImplementation((_auth, _firestore) => {
        return { setRole: jest.fn().mockRejectedValue(false) } as any;
      });
      mockAdminService.getMockImplementation;
      const requestInput = {
        headers: {
          "x-api-key": 'S@nti-1995',
        },
        body: { uid: 'testuid' },
      } as unknown as functions.https.Request;
      const mockResponse = {
        status: (code: number) => {
          expect(code).toBe(500);
          return {
            json: jest.fn(),
          };
        },
      } as any;

      await setAdminRole(requestInput, mockResponse);
    });

    it('Then return 200 If setAdminRole failed', async () => {
      mockAdminService.mockImplementation((_auth, _firestore) => {
        return { setRole: jest.fn().mockResolvedValue(false) } as any;
      });
      mockAdminService.getMockImplementation;
      const requestInput = {
        headers: {
          "x-api-key": 'S@nti-1995',
        },
        body: { uid: 'testuid' },
      } as unknown as functions.https.Request;
      const mockResponse = {
        status: (code: number) => {
          expect(code).toBe(200);
          return {
            json: jest.fn(),
          };
        },
      } as any;

      await setAdminRole(requestInput, mockResponse);
    });
  })
});
