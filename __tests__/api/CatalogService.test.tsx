import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../api/constants';
import endpoint from '../../api/endpoint';
import { getCatalog } from '../../api/services/catalogService';
import {
  catalogPaginationSuccessResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/api/catalogMocks';

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
    console.log('data: ', data);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.place}/${getParams.id}/catalog`,
      { headers: headers, params: { name: '', limit: '', page: '' } }
    );
    expect(data).toEqual(mockedResponse);
  });
});
