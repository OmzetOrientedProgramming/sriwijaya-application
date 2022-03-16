import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../requests/constants';
import endpoint from '../../requests/endpoint';
import { getCatalog } from '../../requests/services/catalogService';
import {
  catalogPaginationSuccessResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/requests/catalogMocks';

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
