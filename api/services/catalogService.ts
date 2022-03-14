import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Export all params & axios function to create hooks
export interface getCatalogParams {
  id: string;
  name?: string;
  limit?: string;
  page?: string;
}

export const getCatalog = async (params: getCatalogParams) => {
  const options = {
    headers,
    params: { name: params.name, limit: params.limit, page: params.page },
  };
  // console.log('ini service');
  return await axios.get(`${endpoint.place}/${params.id}/catalog`, options);
};

// import axios from 'axios';
// import endpoint from '../endpoint';
// import { headers } from '../constants';

// // Export all params & axios function to create hooks
// export interface getCatalogParams {
//   id: string;
//   name?: string;
//   limit: number;
//   page: number;
// }

// export const getCatalog = async (params: getCatalogParams) => {
//   const options = {
//     headers,
//     params: { name: params.name, limit: params.limit, page: params.page },
//   };
//   console.log('ini service');
//   return await axios.get(`${endpoint.place}/${params.id}/catalog`, options);
// };
