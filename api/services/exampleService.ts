// Service Example, add more service files for other requests

import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Export all params & axios function to create hooks
export interface getExampleParams {
  page: number;
}

export const getExample = (params: getExampleParams) => {
  const options = {
    headers,
    params,
  };
  return axios.get(endpoint.example, options);
};

export interface postExampleParams {
  name: string;
  job: string;
}

export const postExample = (params: postExampleParams) => {
  const options = {
    headers,
    params,
  };
  return axios.post(endpoint.example, options);
};
