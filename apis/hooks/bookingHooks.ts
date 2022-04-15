import { useMutation, useQuery } from 'react-query';
import {
  getBookingDate,
  getBookingDateParams,
  getBookingTime,
  getBookingTimeParams,
  postCreateBooking,
  postCreateBookingParams,
} from '../services/bookingService';

export const useGetBookingDate = (
  params: getBookingDateParams,
  handler?: any
) => {
  return useQuery(
    ['get_booking_date', params],
    () => getBookingDate(params),
    handler
  );
};

export const useGetBookingTime = (
  params: getBookingTimeParams,
  handler?: any
) => {
  return useQuery(
    ['get_booking_time', params],
    () => getBookingTime(params),
    handler
  );
};

export const usePostCreateBooking = () => useMutation(postCreateBooking);
