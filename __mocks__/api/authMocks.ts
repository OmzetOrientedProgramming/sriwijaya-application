import { AxiosResponse } from 'axios';

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
};

// Verify OTP
export const dummyVerifyOTPResponse = {
  status: 200,
  message: 'success',
};

export const mockVerifyOTPResponse: AxiosResponse = {
  data: dummyVerifyOTPResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const verifyOTPParams = {
  session: 'register',
  phone_number: '087748176534',
  otp: '068823',
};

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
  phone_number: '087748176534',
  full_name: 'Muhammad Mario Daloma',
};
