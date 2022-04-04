import { useQuery } from 'react-query';
import {
  getPlaceDetailParams,
  placeDetail,
  getPlaceTimeSlots,
  getPlaceTimeSlotsParams,
} from '../services/placeDetailService';

export function useGetPlaceDetail(params: getPlaceDetailParams, handler?: any) {
  return useQuery(
    ['get_place_detail', params],
    () => placeDetail(params),
    handler
  );
}

export const useGetPlaceTimeSlots = (
  params: getPlaceTimeSlotsParams,
  handler?: any
) => {
  return useQuery(
    ['get_place_time_slots', params],
    () => getPlaceTimeSlots(params),
    handler
  );
};
