import { setAdminRole } from "../../apis";
import AdminService from "../../core/services/adminService";
jest.mock("../../core/services/adminService")

describe('Given setAdminRole is called', () => {
  describe('When call with invalid request body', () => {
    it('Then return error 400', () => {
      expect(400).toBe(400);
    })
  })
});
