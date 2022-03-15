// Base URL based on environment variable
export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1`;
export const baseUrlMock = `${process.env.NEXT_PUBLIC_API_URL_MOCK!}/api/v1`;
export const baseUrlExample = 'https://reqres.in/api'; // for initial example page only
export const localURL = `${process.env.NEXT_PUBLIC_API_URL_LOCAL!}/api/v1`;

const endpoint = {
  // Add more URL endpoints to request here
  example: `${baseUrlExample}/users`,
  checkPhoneNumber: `${baseUrl}/auth/check-phone-number`,
  verifyOTP: `${baseUrl}/auth/verify-otp`,
  registerUser: `${baseUrl}/auth/register`,
  place: `${baseUrl}/place`,
};

export default endpoint;
