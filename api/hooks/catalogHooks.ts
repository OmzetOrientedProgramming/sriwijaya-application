import { useQuery } from 'react-query';
import { getCatalogParams } from '../services/catalogService';
import { getCatalog } from '../services/catalogService';

export function useGetCatalog(params: getCatalogParams, handler?: any) {
  // console.log('ini hooks');
  return useQuery(['get_catalog', params], () => getCatalog(params), {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: handler.onSuccess,
    onError: handler.onError,
  });
}
