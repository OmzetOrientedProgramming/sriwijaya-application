import { useQuery } from 'react-query';
import {
  getListPlacesParams,
  getListPlaces,
} from '../services/listPlacesService';

export function useGetListPlaces(params: getListPlacesParams, handler?: any) {
  return useQuery('get_query_places', () => getListPlaces(params), handler);
}
