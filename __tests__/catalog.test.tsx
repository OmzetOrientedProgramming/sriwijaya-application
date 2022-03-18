import { cleanup, render } from '@testing-library/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import Catalog from '../pages/place/[id]/catalog';
import { headers } from '../apis/constants';
import { getParams, mockedResponse } from '../__mocks__/apis/catalogMocks';
import endpoint from '../apis/endpoint';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { handleScrollRefetch } from '../pages';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('useGetCatalog()', () => {
  test('page display catalog data', async () => {
    const mockRouter = createMockRouter({
      query: { id: '1', name: '', limit: '', page: '' },
    });

    const Wrapper = setupWrapper();

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    render(
      <Wrapper>
        <RouterContext.Provider value={mockRouter}>
          <Catalog />
        </RouterContext.Provider>
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${endpoint.place}/${getParams.id}/catalog`,
      { headers: headers, params: { name: '', limit: 5, page: 1 } }
    );
  });
  test('handleScrollRefetch works correctly', async () => {
    const refetch = jest.fn();

    handleScrollRefetch(refetch);

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
