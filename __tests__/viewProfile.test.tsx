import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CustomerProfile from '../pages/profil/index'
import { QueryClient, QueryClientProvider } from 'react-query';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import axios from 'axios';
import { mockedResponse } from '../__mocks__/apis/viewProfileMocks';

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

describe('Test UI For View Profile ', () => {

  test('View Profile Correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    const Wrapper = setupWrapper();
  
    console.error = jest.fn();

    render(
      <Wrapper>
        <CustomerProfile />
      </Wrapper>
    );

    expect(await screen.queryByText("Personal Data")).toBeInTheDocument();
  });


});
