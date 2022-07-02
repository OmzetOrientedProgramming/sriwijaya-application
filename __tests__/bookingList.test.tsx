import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import BookingList, { handleScrollRefetch } from '../pages/booking-saya';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import axios from 'axios';
import { mockedResponse, mockedResponse2 } from '../__mocks__/apis/bookingsListMocks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const setupWrapper = () => {
  const queryClient = new QueryClient();

  const mockRouter = createMockRouter({
    query: { session: 'Register' },
  });

  const Wrapper: React.FC = ({ children }) => (
    <RouterContext.Provider value={mockRouter}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RouterContext.Provider>
  );

  return Wrapper;
};

describe('Test UI For Booking List ', () => {
  console.error = jest.fn();
  test('page display previous bookings', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <BookingList />
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(await screen.findByText('place_name_mock_0')).toBeInTheDocument();
  });

  test('page display ongoing bookings', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    mockedAxios.get.mockResolvedValueOnce(mockedResponse2);

    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <BookingList />
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    // expect(await screen.queryByText('place_name_mock_0')).toBeInTheDocument();
  });




  test('handleScrollRefetch works correctly', async () => {
    const refetch = jest.fn();

    handleScrollRefetch(refetch);

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
