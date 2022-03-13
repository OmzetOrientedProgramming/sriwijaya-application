import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../api/constants';
import endpoint from '../../api/endpoint';
import {
  checkPhoneNumber,
  verifyOTP,
  registerCustomer,
} from '../../api/services/registrationService';
import {
  dummyCheckPhoneResponse,
  mockCheckPhoneResponse,
  checkPhoneParams,
  mockVerifyOTPResponse,
  verifyOTPParams,
  dummyVerifyOTPResponse,
  mockRegisterCustomerResponse,
  registerCustomerParams,
  dummyRegisterCustomerResponse,
} from '../../__mocks__/api/registrationMocks';

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

describe('registerCustomer', () => {
  test('registerCustomer return success', async () => {
    mockAxios.post.mockResolvedValueOnce(mockRegisterCustomerResponse);

    expect(mockAxios.post).not.toHaveBeenCalled();
    const data = await registerCustomer(registerCustomerParams);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      endpoint.register,
      {
        phone_number: registerCustomerParams.phone_number,
        full_name: registerCustomerParams.full_name,
      },
      {
        headers: headers,
      }
    );
    expect(data.data).toEqual(dummyRegisterCustomerResponse);
  });
});
