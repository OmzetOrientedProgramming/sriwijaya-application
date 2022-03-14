import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import ListPlaces, { handleScrollRefetch } from '../pages/index';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import axios from 'axios';
import { mockedResponse } from '../__mocks__/api/listPlacesMocks';

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

describe('Test UI For List Places ', () => {
  console.error = jest.fn();

  test('page display data requested', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <ListPlaces />
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('mock_place_name_0')).toBeInTheDocument();
  });

  test('handleScrollRefetch works correctly', async () => {
    const refetch = jest.fn();

    handleScrollRefetch(refetch);

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
