import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';
import qs from 'qs';

export type getListPlacesParams = {
  limit: number;
  page: number;
  sort: string;
  category?: string;
  people?: string[];
  price?: string[];
  rating?: string[];
  lat: number;
  lng: number;
};

export const getListPlaces = async (params: getListPlacesParams) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
    params,
    paramsSerializer: (param: getListPlacesParams) => {
      return qs.stringify(param, { arrayFormat: 'repeat' });
    },
  };
  const response = await axios.get(endpoint.place, options);
  return response.data;
};
