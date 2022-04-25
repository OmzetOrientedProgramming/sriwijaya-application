import { useMutation } from 'react-query';
import {
  putEditProfile,
  uploadProfilePicture,
} from '../services/profilService';

export const useUploadProfilePicture = () => useMutation(uploadProfilePicture);

export const usePutEditProfile = () => useMutation(putEditProfile);
