import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import PlaceDetail from '../pages/place/[id]';
import { headers } from '../apis/constants';
import { getParams, mockedResponse } from '../__mocks__/apis/placeDetailMocks';
import endpoint from '../apis/endpoint';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { reviewRatingMockedResponse } from '../__mocks__/apis/reviewAndRatingMocks';

const registerUserCookies = {
  accessToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxZDU2YTI1MWU0ZGRhM2Y0NWM0MWZkNWQ0ZGEwMWQyYjlkNzJlMGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9yZWFsLWZvcmVzdC0zNDQyMDQiLCJhdWQiOiJib3JlYWwtZm9yZXN0LTM0NDIwNCIsImF1dGhfdGltZSI6MTY0NzY3MDEzMCwidXNlcl9pZCI6IlR2SEwwOEVVVjlnVk1lOVdKa1plOFVZaHVKMDIiLCJzdWIiOiJUdkhMMDhFVVY5Z1ZNZTlXSmtaZThVWWh1SjAyIiwiaWF0IjoxNjQ3NjcwMTMwLCJleHAiOjE2NDc2NzM3MzAsInBob25lX251bWJlciI6Iis2MjgxMjkxMjY0NzU4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrNjI4MTI5MTI2NDc1OCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.OkS90AZGDpfL8KJ53_YSxMBNMSDURzpw9WgNOgBdNbvZCZs_1tOpOHCQJtnCdCGlZ8smtbuP0Oc_CZj7J_XIsIFOo06O2wdsQqUNtnUYpzut5QsrJ4jpgdPlNhyBSiYDgszPowl35kA4DbyP03hrrmNN72Pv_Q_y1foXavAOEackziYGXhgSJ8v_S9vJJfamzomrIrsESj1X0UlAQQ0f2Py4H2rz9lNuvZxetDz_JTOl7RvUhKUVkivfxeMB43vamJO5FFP1l8josFP9hjFGjAc5WPVJVhJHuFyypRtruA1fdnwyl0Ru7UHtVIOK7pG-MT1HlghASG70FeD_R4Rkuw',
  refreshToken:
    'AIwUaOk05nVQ5y-sYwKOP7TZMA3YVpq1F4SZ2IRW7bShzH8JY6ZnRV3AvFbSkCjG6lA_H69ZonuEadihn7klx1dLwPgSD1XVt5VP9pgA3qM427k-Sw12IEygLD-xNQ_Qf3bE440xfpOTL5YhTlZxogady1rsJweWMOieb7FNKM08ATQrwhoz7afH_peFo1cKpastC91u34z652BKDni_JsJLQbK1CTM1dw',
};

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('nookies', () => {
  return {
    get: jest.fn().mockImplementation(() => registerUserCookies),
    set: jest.fn(),
  };
});

beforeAll(() => {
  console.error = jest.fn();
});

// Must do
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Setup for react-query hooks
const setupWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

describe('useGetPlaceDetail()', () => {
  test('page display place detail data', async () => {
    const mockRouter = createMockRouter({
      query: { id: '1' },
    });

    const Wrapper = setupWrapper();

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    mockedAxios.get.mockResolvedValueOnce(reviewRatingMockedResponse);

    render(
      <Wrapper>
        <RouterContext.Provider value={mockRouter}>
          <PlaceDetail />
        </RouterContext.Provider>
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.place}/${getParams.id}`,
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${registerUserCookies.accessToken}`,
        },
      }
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.place}/${getParams.id}/review`,
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${registerUserCookies.accessToken}`,
        },
        params: { latest: true, rating: false, limit: 2, page: 1 },
      }
    );
  });

  test('post button request failed', async () => {
    const mockRouter = createMockRouter({
      query: { id: '1' },
    });

    const Wrapper = setupWrapper();

    mockedAxios.post.mockRejectedValueOnce(new Error('Async error'));

    render(
      <Wrapper>
        <RouterContext.Provider value={mockRouter}>
          <PlaceDetail />
        </RouterContext.Provider>
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
