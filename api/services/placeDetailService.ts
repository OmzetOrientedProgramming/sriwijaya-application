import axios from 'axios'
import endpoint from '../endpoint'
import { headers } from '../constants'


export interface getPlaceDetailParams {
  id: string
}

export const placeDetail = async (params: getPlaceDetailParams) => {
    const options = {
      headers,
    }

    const axiosData = await axios.get(`${endpoint.place}/${params.id}`, options)
    return axiosData.data
}
