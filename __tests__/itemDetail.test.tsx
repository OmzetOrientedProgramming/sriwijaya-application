import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import ItemDetail from '../pages/place/[id]/catalog/[item_id]';
import { headers } from '../api/constants';
import { getParams, mockedResponse } from '../__mocks__/api/itemDetailMocks';
import endpoint from '../api/endpoint';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';

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

describe('useGetItemDetail()', () => {
  test('page display catalog data', async () => {
    const mockRouter = createMockRouter({
      query: { placeID: '1', itemID: '1' },
    });

    const Wrapper = setupWrapper();

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    render(
      <Wrapper>
        <RouterContext.Provider value={mockRouter}>
          <ItemDetail />
        </RouterContext.Provider>
      </Wrapper>
    );

    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
