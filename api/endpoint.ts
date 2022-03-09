// Add backend URL to request
export const baseUrlExample = 'https://reqres.in/api'
export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`

const endpoint = {
  // Add more URL endpoints to request here
  example: `${baseUrlExample}/users`,
  place: `${baseUrl}/place`
}

export default endpoint