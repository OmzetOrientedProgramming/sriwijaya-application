import axios from 'axios';
import nookies from 'nookies';

import endpoint from '../endpoint';

export interface Payload {
    booking_id: number;
    rating: number;
    content: string;
}

export const postBookingReview = async (data: Payload) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
        },
    };
  
    const response = await axios.post(`${endpoint.bookingReview}/${data.booking_id}`, data, options);
  
    return response;
};