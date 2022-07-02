import axios from 'axios';
import nookies from 'nookies';

import endpoint from '../endpoint';

export interface profilePicturePayloadType {
  file: string;
}

export const uploadProfilePicture = async (data: profilePicturePayloadType) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };

  const response = await axios.post(
    endpoint.upload + '/profile-picture',
    data,
    options
  );

  return response;
};

export interface profilPayloadType {
  name: string;
  profile_picture: string;
  date_of_birth: string;
  gender: number;
}

export const putEditProfile = async (data: profilPayloadType) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };

  const response = await axios.put(endpoint.userProfile, data, options);

  return response;
};

export const viewProfile = async () => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };
  const response = await axios.get(endpoint.userProfile, options);
  return response.data;
};
