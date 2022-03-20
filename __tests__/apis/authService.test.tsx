import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import {
  checkPhoneNumber,
  verifyOTP,
  registerUser,
} from '../../apis/services/authService';
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
} from '../../__mocks__/apis/authMocks';

const registerUserCookies = {
  accessToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxZDU2YTI1MWU0ZGRhM2Y0NWM0MWZkNWQ0ZGEwMWQyYjlkNzJlMGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9yZWFsLWZvcmVzdC0zNDQyMDQiLCJhdWQiOiJib3JlYWwtZm9yZXN0LTM0NDIwNCIsImF1dGhfdGltZSI6MTY0NzY3MDEzMCwidXNlcl9pZCI6IlR2SEwwOEVVVjlnVk1lOVdKa1plOFVZaHVKMDIiLCJzdWIiOiJUdkhMMDhFVVY5Z1ZNZTlXSmtaZThVWWh1SjAyIiwiaWF0IjoxNjQ3NjcwMTMwLCJleHAiOjE2NDc2NzM3MzAsInBob25lX251bWJlciI6Iis2MjgxMjkxMjY0NzU4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrNjI4MTI5MTI2NDc1OCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.OkS90AZGDpfL8KJ53_YSxMBNMSDURzpw9WgNOgBdNbvZCZs_1tOpOHCQJtnCdCGlZ8smtbuP0Oc_CZj7J_XIsIFOo06O2wdsQqUNtnUYpzut5QsrJ4jpgdPlNhyBSiYDgszPowl35kA4DbyP03hrrmNN72Pv_Q_y1foXavAOEackziYGXhgSJ8v_S9vJJfamzomrIrsESj1X0UlAQQ0f2Py4H2rz9lNuvZxetDz_JTOl7RvUhKUVkivfxeMB43vamJO5FFP1l8josFP9hjFGjAc5WPVJVhJHuFyypRtruA1fdnwyl0Ru7UHtVIOK7pG-MT1HlghASG70FeD_R4Rkuw',
  refreshToken:
    'AIwUaOk05nVQ5y-sYwKOP7TZMA3YVpq1F4SZ2IRW7bShzH8JY6ZnRV3AvFbSkCjG6lA_H69ZonuEadihn7klx1dLwPgSD1XVt5VP9pgA3qM427k-Sw12IEygLD-xNQ_Qf3bE440xfpOTL5YhTlZxogady1rsJweWMOieb7FNKM08ATQrwhoz7afH_peFo1cKpastC91u34z652BKDni_JsJLQbK1CTM1dw',
};

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('nookies', () => {
  return {
    get: jest.fn().mockImplementation(() => registerUserCookies),
    set: jest.fn(),
  };
});

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
        recaptcha_token: checkPhoneParams.recaptcha_token,
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
        session_info: verifyOTPParams.session_info,
        otp: verifyOTPParams.otp,
      },
      {
        headers: headers,
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
        full_name: registerUserParams.full_name,
      },
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${registerUserCookies.accessToken}`,
        },
      }
    );
    expect(data.data).toEqual(dummyRegisterUserResponse);
  });
});
