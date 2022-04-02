import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import BookingList, { handleScrollRefetch } from '../pages/booking-saya';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import axios from 'axios';

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

  test('page display data requested', async () => {

    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <BookingList />
      </Wrapper>
    );

    expect(await screen.findByText('Terkonfirmasi')).toBeInTheDocument();
  });

  test('handleScrollRefetch works correctly', async () => {
    const refetch = jest.fn();

    handleScrollRefetch(refetch);

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
