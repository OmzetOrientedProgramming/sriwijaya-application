import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../api/constants';
import endpoint from '../../api/endpoint';
import { placeDetail } from '../../api/services/placeDetailService';
import {
  dummyResponse,
  mockedResponse,
  getParams,
} from '../../__mocks__/api/placeDetailMocks';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('getPlaceDetail()', () => {
    test('getPlaceDetail return correct data', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockedResponse);
  
      expect(mockedAxios.post).not.toHaveBeenCalled();
      const data = await placeDetail(getParams);
  
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${endpoint.place}/${getParams.id}`,
        { headers: headers }
      );
      expect(data).toEqual(dummyResponse);
    });
});