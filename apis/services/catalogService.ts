import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Export all params & axios function to create hooks
export interface getCatalogParams {
  id: string;
  name?: string;
  limit?: number;
  page?: number;
}

export const getCatalog = async (params: getCatalogParams) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
    params: { name: params.name, limit: params.limit, page: params.page },
  };
  return await axios.get(`${endpoint.place}/${params.id}/catalog`, options);
};
