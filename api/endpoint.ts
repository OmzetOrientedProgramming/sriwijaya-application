// Base URL based on environment variable
export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1`;
export const baseUrlMock = `${process.env.NEXT_PUBLIC_API_URL_MOCK!}/api/v1`;
export const baseUrlExample = 'https://reqres.in/api'; // for initial example page only

const endpoint = {
  // Add more URL endpoints to request here
  example: `${baseUrlExample}/users`,
  checkPhoneNumber: `${baseUrlMock}/auth/check-phone-number`,
  verifyOTP: `${baseUrlMock}/verify-otp`,
  register: `${baseUrlMock}/auth/register`,
  place: `${baseUrl}/place`,
};

export default endpoint;
