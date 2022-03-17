import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Export all params & axios function to create hooks
export interface getItemDetailParams {
  placeID: string;
  itemID: string;
}

export const getItemDetail = async (params: getItemDetailParams) => {
  const options = {
    headers,
  };
  return await axios.get(
    `${endpoint.place}/${params.placeID}/catalog/${params.itemID}`,
    options
  );
};
