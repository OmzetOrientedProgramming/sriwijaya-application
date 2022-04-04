import axios from 'axios';
import endpoint from '../endpoint';
import { headers } from '../constants';

export interface getPlaceDetailParams {
  id: string;
}

export const placeDetail = async (params: getPlaceDetailParams) => {
  const options = {
    headers,
  };

  const axiosData = await axios.get(`${endpoint.place}/${params.id}`, options);
  return axiosData.data;
};

export interface getPlaceTimeSlotsParams {
  id: string;
  date: string;
}

export const getPlaceTimeSlots = async (params: getPlaceTimeSlotsParams) => {
  const options = {
    headers,
    params: {
      date: params.date,
    },
  };
  const axiosData = await axios.get(
    `${endpoint.place}/${params.id}/time-slot`,
    options
  );
  return axiosData.data;
};
