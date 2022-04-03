import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export const getOngoingBookings = async () => {
  const options = {
    headers,
  };
  const response = await axios.get(endpoint.ongoingBookings, options);
  return response.data;
};