import { cleanup } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { headers } from '../../api/constants';
import { getExample, postExample } from '../../api/services/exampleService';
import {
  dummyResponse,
  getParams,
  mockedResponse,
  postParams,
} from '../../__mocks__/api/exampleMocks';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getExample()', () => {
  test('getExample return correct list', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    const data = await getExample(getParams);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      { headers: headers, params: getParams }
    );
    expect(data.data).toEqual(dummyResponse);
  });
});

describe('postExample()', () => {
  test('postExample return correct list', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    const data = await postExample(postParams);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      { headers: headers, params: postParams }
    );
    expect(data.data).toEqual(dummyResponse);
  });
});
