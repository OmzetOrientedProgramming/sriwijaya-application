import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

export const getOngoingBookings = async () => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };
  const response = await axios.get(endpoint.ongoingBookings, options);
  return response.data;
};
