import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Export all params & axios function to create hooks
export interface getItemDetailParams {
  placeID: string;
  itemID: string;
}

export const getItemDetail = async (params: getItemDetailParams) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };
  return await axios.get(
    `${endpoint.place}/${params.placeID}/catalog/${params.itemID}`,
    options
  );
};
