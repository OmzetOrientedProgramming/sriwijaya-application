// Service Example, add more service files for other requests

import axios from 'axios'
import endpoint from '../endpoint'
import headers from '../headers'

export const getExample = (params: { page: number }) => {
  console.log(params)
  const options = {
    headers,
    params
  }
  return axios.get(endpoint.example, options) 
}

interface postExampleParams {
  name: string,
  job: string
}

export const postExample = (params: postExampleParams) => {
  const options = {
    headers,
    params
  }
  return axios.post(endpoint.example, options) 
}