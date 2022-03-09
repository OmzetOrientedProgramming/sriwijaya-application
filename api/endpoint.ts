// Base URL based on environment variable
export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1`
export const baseUrlExample = 'https://reqres.in/api'

const endpoint = {
  // Add more URL endpoints to request here
  example: `${baseUrlExample}/users`,
  place: `${baseUrl}/place`
}

export default endpoint