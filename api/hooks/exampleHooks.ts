import { useMutation, useQuery } from 'react-query';
import { getExample, getExampleParams, postExample, postExampleParams } from '../services/exampleService'; 

// Hooks examples using useQuery & useMutation, handler is for success/error function
export function useGetExample(params: getExampleParams, handler?: any) {
  return useQuery('get_example', () => getExample(params), handler)
}

export function usePostExample(params: postExampleParams, handler?: any) {
  return useMutation(() => postExample(params), handler)
}