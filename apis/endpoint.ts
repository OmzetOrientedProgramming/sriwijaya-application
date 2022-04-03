// Base URL based on environment variable
export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1`;
export const baseUrlMock = `${process.env.NEXT_PUBLIC_API_URL_MOCK!}/api/v1`;
export const localURL = `${process.env.NEXT_PUBLIC_API_URL_LOCAL!}/api/v1`;

const endpoint = {
  // Add more URL endpoints to request here
  checkPhoneNumber: `${baseUrl}/auth/check-phone-number`,
  verifyOTP: `${baseUrl}/auth/verify-otp`,
  registerUser: `${baseUrl}/auth/register`,
  place: `${baseUrl}/place`,
  ongoingBookings: `${baseUrl}/booking/ongoing`,
  previousBookings: `${baseUrl}/booking/previous`,
};

export default endpoint;
