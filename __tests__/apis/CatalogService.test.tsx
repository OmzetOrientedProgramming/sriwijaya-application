import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import { getCatalog } from '../../apis/services/catalogService';
import {
  catalogPaginationSuccessResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/apis/catalogMocks';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getCatalog()', () => {
  test('getCatalog return correct data', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    const data = await getCatalog(getParams);
    // console.log('data: ', data);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.place}/${getParams.id}/catalog`,
      { headers: headers, params: { name: '', limit: 1, page: 1 } }
    );
    expect(data).toEqual(mockedResponse);
  });
});
