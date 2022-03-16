import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../requests/constants';
import endpoint from '../../requests/endpoint';
import {
  checkPhoneNumber,
  verifyOTP,
  registerUser,
} from '../../requests/services/authService';
import {
  dummyCheckPhoneResponse,
  mockCheckPhoneResponse,
  checkPhoneParams,
  mockVerifyOTPResponse,
  verifyOTPParams,
  dummyVerifyOTPResponse,
  dummyRegisterUserResponse,
  mockRegisterUserResponse,
  registerUserParams,
} from '../../__mocks__/requests/authMocks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('checkPhoneNumber', () => {
  test('checkPhoneNumber return success', async () => {
    mockAxios.post.mockResolvedValueOnce(mockCheckPhoneResponse);

    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await checkPhoneNumber(checkPhoneParams);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      endpoint.checkPhoneNumber,
      {
        phone_number: checkPhoneParams.phone_number,
      },
      {
        headers: headers,
        params: { session: checkPhoneParams.session },
      }
    );
    expect(data.data).toEqual(dummyCheckPhoneResponse);
  });
});

describe('verifyOTP', () => {
  test('verifyOTP return success', async () => {
    mockAxios.post.mockResolvedValueOnce(mockVerifyOTPResponse);
    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await verifyOTP(verifyOTPParams);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      endpoint.verifyOTP,
      {
        phone_number: verifyOTPParams.phone_number,
        otp: verifyOTPParams.otp,
      },
      {
        headers: headers,
        params: { session: verifyOTPParams.session },
      }
    );
    expect(data.data).toEqual(dummyVerifyOTPResponse);
  });
});

describe('registerUser', () => {
  test('registerUser return success', async () => {
    mockAxios.post.mockResolvedValueOnce(mockRegisterUserResponse);
    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await registerUser(registerUserParams);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      endpoint.registerUser,
      {
        phone_number: registerUserParams.phone_number,
        full_name: registerUserParams.full_name,
      },
      {
        headers: headers,
      }
    );
    expect(data.data).toEqual(dummyRegisterUserResponse);
  });
});
