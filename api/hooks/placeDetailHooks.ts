import { useQuery } from 'react-query';
import { getPlaceDetailParams, placeDetail } from '../services/placeDetailService'

export function useGetPlaceDetail( params:getPlaceDetailParams, handler?: any,) {
    return useQuery('get_place_detail', () => placeDetail(params), handler)
}