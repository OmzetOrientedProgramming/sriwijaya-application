import { useQuery } from 'react-query';
import {
  getListPlacesParams,
  getListPlaces,
} from '../services/listPlacesService';

export function useGetListPlaces(params: getListPlacesParams, handler?: any) {
  return useQuery('get_place_detail', () => getListPlaces(params), handler);
}
