import React, { useState } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ListPlaces from '../pages/ListPlaces';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';

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

describe('Test UI For List Places ', () => {
  console.error = jest.fn();

  test('page display data requested', async () => {
    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <ListPlaces />
      </Wrapper>
    );

    expect(screen.queryByText('mock_place_name_0')).toBeInTheDocument();
  });
});
