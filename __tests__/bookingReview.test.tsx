import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import BookingReview from '../pages/booking-saya/[id]/review/index'
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

describe('Test UI For Booking Review', () => {

  test('View Booking Review Correctly', async () => {

    const Wrapper = setupWrapper();
  
    console.error = jest.fn();

    render(
      <Wrapper>
        <BookingReview />
      </Wrapper>
    );
  });


});
