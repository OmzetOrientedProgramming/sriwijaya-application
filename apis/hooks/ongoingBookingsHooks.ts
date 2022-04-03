import { useQuery } from 'react-query';
import { getOngoingBookings } from '../services/ongoingBookingsService';

export function useGetOngoingBookings(handler?: any) {
    return useQuery('get_ongoing_bookings', () => getOngoingBookings(), handler);
}