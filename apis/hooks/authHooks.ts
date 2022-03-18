import { useMutation } from 'react-query';
import {
  registerUser,
  checkPhoneNumber,
  verifyOTP,
} from '../services/authService';

export function useCheckPhoneNumber() {
  return useMutation(checkPhoneNumber);
}

export function useVerifyOTP() {
  return useMutation(verifyOTP);
}

export function useRegisterUser() {
  return useMutation(registerUser);
}
