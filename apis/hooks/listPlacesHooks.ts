import { useInfiniteQuery } from 'react-query';
import { getListPlaces } from '../services/listPlacesService';

export function useGetListPlaces() {
  return useInfiniteQuery(
    'get_query_places',
    ({ pageParam }) => {
      return getListPlaces({ limit: 5, page: pageParam });
    },
    {
      getNextPageParam: (currentPage, allPages) => {
        if (currentPage.data.places.length === 0) {
          return undefined;
        } else {
          return currentPage.data.pagination.page + 1;
        }
      },
    }
  );
}
