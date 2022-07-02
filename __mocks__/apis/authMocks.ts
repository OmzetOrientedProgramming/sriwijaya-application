import { AxiosResponse } from 'axios';

import {
  checkPhoneNumberParamsType,
  verifyOTPParamsType,
  registerUserParamsType,
} from '../../apis/services/authService';

// Check Phone Number
export const dummyCheckPhoneResponse = {
  status: 200,
  message: 'success',
};

export const mockCheckPhoneResponse: AxiosResponse = {
  data: dummyCheckPhoneResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const checkPhoneParams = {
  session: 'register',
  phone_number: '087748176534',
  recaptcha_token: 'aoiwjdoiajidojaiowdoiajwdioajwdawd',
} as checkPhoneNumberParamsType;

// Verify OTP
export const dummyVerifyOTPResponse = {
  status: 200,
  message: 'success',
  data: {
    access_token:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxZDU2YTI1MWU0ZGRhM2Y0NWM0MWZkNWQ0ZGEwMWQyYjlkNzJlMGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9yZWFsLWZvcmVzdC0zNDQyMDQiLCJhdWQiOiJib3JlYWwtZm9yZXN0LTM0NDIwNCIsImF1dGhfdGltZSI6MTY0NzY3MDEzMCwidXNlcl9pZCI6IlR2SEwwOEVVVjlnVk1lOVdKa1plOFVZaHVKMDIiLCJzdWIiOiJUdkhMMDhFVVY5Z1ZNZTlXSmtaZThVWWh1SjAyIiwiaWF0IjoxNjQ3NjcwMTMwLCJleHAiOjE2NDc2NzM3MzAsInBob25lX251bWJlciI6Iis2MjgxMjkxMjY0NzU4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrNjI4MTI5MTI2NDc1OCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.OkS90AZGDpfL8KJ53_YSxMBNMSDURzpw9WgNOgBdNbvZCZs_1tOpOHCQJtnCdCGlZ8smtbuP0Oc_CZj7J_XIsIFOo06O2wdsQqUNtnUYpzut5QsrJ4jpgdPlNhyBSiYDgszPowl35kA4DbyP03hrrmNN72Pv_Q_y1foXavAOEackziYGXhgSJ8v_S9vJJfamzomrIrsESj1X0UlAQQ0f2Py4H2rz9lNuvZxetDz_JTOl7RvUhKUVkivfxeMB43vamJO5FFP1l8josFP9hjFGjAc5WPVJVhJHuFyypRtruA1fdnwyl0Ru7UHtVIOK7pG-MT1HlghASG70FeD_R4Rkuw',
    refresh_token:
      'AIwUaOk05nVQ5y-sYwKOP7TZMA3YVpq1F4SZ2IRW7bShzH8JY6ZnRV3AvFbSkCjG6lA_H69ZonuEadihn7klx1dLwPgSD1XVt5VP9pgA3qM427k-Sw12IEygLD-xNQ_Qf3bE440xfpOTL5YhTlZxogady1rsJweWMOieb7FNKM08ATQrwhoz7afH_peFo1cKpastC91u34z652BKDni_JsJLQbK1CTM1dw',
    expires_in: '3600',
    local_id: 'TvHL08EUV9gVMe9WJkZe8UYhuJ02',
    is_new_user: false,
    phone_number: '+6281291264758',
  },
};

export const mockVerifyOTPResponse: AxiosResponse = {
  data: dummyVerifyOTPResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const verifyOTPParams = {
  session_info: 'adjiwaodjioajiodjaowjdoijaid',
  otp: '068823',
} as verifyOTPParamsType;

// Register user
export const dummyRegisterUserResponse = {
  status: 201,
  message: 'success',
  data: {
    id: 1,
    full_name: '',
    phone_number: '',
    email: '',
    is_active: true,
    created_at: '2006-01-02T15:04:05Z07:00',
    updated_at: '2006-01-02T15:04:05Z07:00',
    access_token: '',
    refresh_token: '',
  },
};

export const mockRegisterUserResponse: AxiosResponse = {
  data: dummyRegisterUserResponse,
  status: 201,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const registerUserParams = {
  full_name: 'Muhammad Mario Daloma',
} as registerUserParamsType;
