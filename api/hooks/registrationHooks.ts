import { useMutation } from 'react-query';
import {
  registerCustomer,
  checkPhoneNumber,
  verifyOTP,
} from '../services/registrationService';

export function useCheckPhoneNumber() {
  return useMutation(checkPhoneNumber);
}

export function useVerifyOTP() {
  return useMutation(verifyOTP);
}

export function useRegisterCustomer() {
  return useMutation(registerCustomer);
}
