import { useQuery } from 'react-query';
import { viewProfile } from '../services/viewProfileService';

export function useGetViewProfile(handler?: any) {
    return useQuery('get_view_profile', () => viewProfile(), handler);
}