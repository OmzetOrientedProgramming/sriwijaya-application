import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

export const viewProfile = async () => {
    const options = {
      headers: {
        ...headers,
        Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
      },
    };
    const response = await axios.get(endpoint.viewProfile, options);
    return response.data;
  };