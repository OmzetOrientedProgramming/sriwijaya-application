import axios from 'axios';
import nookies from 'nookies';

import endpoint from '../endpoint';
import { headers } from '../constants';

// Check Phone Number
export interface checkPhoneNumberParamsType {
  session: string;
  phone_number: string;
  recaptcha_token: string;
}

export const checkPhoneNumber = async ({
  session,
  phone_number,
  recaptcha_token,
}: checkPhoneNumberParamsType) => {
  const options = {
    headers,
    params: { session },
  };
  const data = {
    phone_number,
    recaptcha_token,
  };
  const response = await axios.post(endpoint.checkPhoneNumber, data, options);
  return response;
};

export interface verifyOTPParamsType {
  session_info: string;
  otp: string;
}

// Verify OTP
export const verifyOTP = async ({ session_info, otp }: verifyOTPParamsType) => {
  const options = {
    headers,
  };

  const data = {
    session_info,
    otp,
  };

  const response = await axios.post(endpoint.verifyOTP, data, options);
  return response;
};

// Register user
export interface registerUserParamsType {
  full_name: string;
}

export const registerUser = async ({ full_name }: registerUserParamsType) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };

  const data = {
    full_name,
  };

  const response = await axios.post(endpoint.registerUser, data, options);
  return response;
};
