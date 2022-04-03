import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export type getPreviousBookingsParams = {
    limit: number;
    page: number;
  };

export const getPreviousBookings = async (params : getPreviousBookingsParams) => {
  const options = {
    headers,
    params
  };
  const response = await axios.get(endpoint.previousBookings, options);
  return response.data;
};