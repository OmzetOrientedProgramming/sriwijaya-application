import { useInfiniteQuery } from 'react-query';
import {
  getListPlaces,
  getListPlacesParams,
} from '../services/listPlacesService';

export function useGetListPlaces(
  params: Omit<getListPlacesParams, 'limit' | 'page'>
) {
  return useInfiniteQuery(
    ['get_query_places', params],
    ({ pageParam }) => {
      return getListPlaces({
        limit: 5,
        page: pageParam,
        sort: params.sort,
        category: params.category,
        people: params.people,
        price: params.price,
        rating: params.rating,
        lat: params.lat,
        lng: params.lng,
      });
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
