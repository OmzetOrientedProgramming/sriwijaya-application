import { useMutation } from 'react-query';
import { postBookingReview } from '../services/bookingReviewService';

export const useUploadProfilePicture = () => useMutation(postBookingReview);