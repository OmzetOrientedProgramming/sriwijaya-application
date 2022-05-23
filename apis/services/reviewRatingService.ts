import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

// Export all params & axios function to create hooks
export interface reviewRatingParams {
  placeID: string;
  limit?: number;
  page?: number;
  latest?: boolean;
  rating?: boolean;
}

export const getReviewRating = async (params: reviewRatingParams) => {
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
    params: {
      limit: params.limit,
      page: params.page,
      latest: params.latest,
      rating: params.rating,
    },
  };
  return await axios.get(`${endpoint.place}/${params.placeID}/review`, options);
};
