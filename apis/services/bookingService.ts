import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

export interface getBookingDateParams {
  placeId: number;
  count: number;
  date: string;
  interval: number;
}

export const getBookingDate = async (params: getBookingDateParams) => {
  const { placeId, ...axiosParams } = params;
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
    params: axiosParams,
  };
  const axiosData = await axios.get(
    `${endpoint.bookingDate}/${placeId}`,
    options
  );

  return axiosData.data;
};

export interface getBookingTimeParams {
  placeId: number;
  check_in: string;
  count: number;
  date: string;
}

export const getBookingTime = async (params: getBookingTimeParams) => {
  const { placeId, ...axiosParams } = params;
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
    params: axiosParams,
  };

  const axiosData = await axios.get(
    `${endpoint.bookingTime}/${placeId}`,
    options
  );

  return axiosData.data;
};

export interface postCreateBookingParams {
  placeId: number;
  items: Array<any>;
  date: string;
  start_time: string;
  end_time: string;
  count: number;
}

export const postCreateBooking = async (params: postCreateBookingParams) => {
  const { placeId, ...data } = params;
  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };

  const axiosData = await axios.post(
    `${endpoint.booking}/${placeId}`,
    data,
    options
  );

  return axiosData.data;
};
