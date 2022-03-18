import { cleanup } from '@testing-library/react';
import axios from 'axios';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import { getListPlaces } from '../../apis/services/listPlacesService';
import { placePaginationSuccessResponse } from '../../__mocks__/apis/listPlacesMocks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const getListPlacesParams = {
  limit: 10,
  page: 1,
};

describe('getListPlaces()', () => {
  test('getListPlaces return correct list', async () => {
    mockedAxios.get.mockResolvedValueOnce(placePaginationSuccessResponse);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    await getListPlaces(getListPlacesParams);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint.place, {
      headers: headers,
      params: getListPlacesParams,
    });
  });
});
