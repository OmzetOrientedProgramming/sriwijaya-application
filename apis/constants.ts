// If needed, add more constants
import nookies from 'nookies';

export const headers = {
  // Authorization: Cookies.get("Authorization"),
  'Content-Type': 'application/json',
  Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
};
