import { useQuery, useMutation } from 'react-query';
import {
  putEditProfile,
  uploadProfilePicture,
  viewProfile,
} from '../services/profilService';

export const useUploadProfilePicture = () => useMutation(uploadProfilePicture);

export const usePutEditProfile = () => useMutation(putEditProfile);

export function useGetViewProfile(handler?: any) {
  return useQuery('get_view_profile', () => viewProfile(), handler);
}
