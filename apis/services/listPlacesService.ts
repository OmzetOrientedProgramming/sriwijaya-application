import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export type getListPlacesParams = {
  limit: number;
  page: number;
};

export const getListPlaces = async (params: getListPlacesParams) => {
  const options = {
    headers,
    params,
  };
  const response = await axios.get(endpoint.place, options);
  return response.data;
};
