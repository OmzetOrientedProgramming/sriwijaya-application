import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../requests/constants';
import endpoint from '../../requests/endpoint';
import { getItemDetail } from '../../requests/services/itemDetailService';
import {
  itemDetailSuccessResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/requests/itemDetailMocks';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getItemDetail()', () => {
  test('getItemDetail return correct data', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    const data = await getItemDetail(getParams);
    // console.log('data: ', data);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.place}/${getParams.placeID}/catalog/${getParams.itemID}`,
      { headers: headers }
    );
    expect(data).toEqual(mockedResponse);
  });
});