import { useQuery } from 'react-query';
import {
    getBookingDetail,
    getBookingDetailParams
} from '../services/bookingDetailServices';

export const useGetBookingDetail = (
    params: getBookingDetailParams,
    handler?: any
) => {
    return useQuery(
        ['get_booking_detail', params],
        () => getBookingDetail(params),
        handler
    );
};

