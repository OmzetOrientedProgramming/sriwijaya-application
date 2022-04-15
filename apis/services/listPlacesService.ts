import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

export type getListPlacesParams = {
  limit: number;
  page: number;
};

export const getListPlaces = async (params: getListPlacesParams) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
    params,
  };
  const response = await axios.get(endpoint.place, options);
  return response.data;
};
