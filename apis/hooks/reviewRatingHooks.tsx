import { useQuery } from 'react-query';
import { reviewRatingParams } from '../services/reviewRatingService';
import { getReviewRating } from '../services/reviewRatingService';

export function useGetReviewRating(params: reviewRatingParams, handler?: any) {
  return useQuery('get_review_rating', () => getReviewRating(params), handler);
}
