import { useInfiniteQuery } from 'react-query';
import { getPreviousBookings } from '../services/previousBookingsService';

export function useGetPreviousBookings() {
    return useInfiniteQuery(
        'get_previous_bookings',
        ({ pageParam }) => {
          return getPreviousBookings({ limit: 5, page: pageParam });
        },
        {
          getNextPageParam: (currentPage) => {
            if (currentPage.data.bookings.length === 0) {
              return undefined;
            } else {
              return currentPage.data.pagination.page + 1;
            }
          },
        }
    );
}