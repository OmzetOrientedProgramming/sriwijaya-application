import { get } from 'https';
import { useQuery } from 'react-query';
import { getItemDetailParams } from '../services/itemDetailService';
import { getItemDetail } from '../services/itemDetailService';

export function useGetItemDetail(params: getItemDetailParams, handler?: any) {
  return useQuery('get_item_detail', () => getItemDetail(params), handler);
}
