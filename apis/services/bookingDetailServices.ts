import axios from 'axios';
import nookies from 'nookies';
import endpoint from '../endpoint';
import { headers } from '../constants';

export interface getBookingDetailParams {
    bookingId: number;    
}

export const getBookingDetail = async (params:getBookingDetailParams) => {
    const { bookingId, ...axiosParams } = params;
    const options = {
        headers: {
            ...headers, 
            Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
        },
        params: axiosParams,
    };
    const axiosData = await axios.get(
        `${endpoint.bookingDetail}/${bookingId}`,
        options
    );

    return axiosData.data;
}