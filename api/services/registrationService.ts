import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Check Phone Number
export interface checkPhoneNumberParams {
  session: string;
  phone_number: string;
}

export const checkPhoneNumber = async ({
  session,
  phone_number,
}: checkPhoneNumberParams) => {
  const options = {
    headers,
    params: { session: session },
  };
  const data = {
    phone_number,
  };
  const response = await axios.post(endpoint.checkPhoneNumber, data, options);
  return response;
};

export interface verifyOTPParams {
  session: string;
  phone_number: string;
  otp: string;
}

// Verify OTP
export const verifyOTP = async ({
  session,
  phone_number,
  otp,
}: verifyOTPParams) => {
  const options = {
    headers,
    params: { session: session },
  };
  const data = {
    phone_number,
    otp,
  };
  const response = await axios.post(endpoint.verifyOTP, data, options);
  return response;
};

// Register Customer
export interface registerCustomerParams {
  phone_number: string;
  full_name: string;
}

export const registerCustomer = async ({
  phone_number,
  full_name,
}: registerCustomerParams) => {
  const options = {
    headers,
  };
  const data = {
    phone_number,
    full_name,
  };
  const response = await axios.post(endpoint.register, data, options);
  return response;
};
