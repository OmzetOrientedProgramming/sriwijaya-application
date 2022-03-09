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
import { headers } from '../api/constants';
import {
    getParams,
    mockedResponse,
} from '../__mocks__/api/placeDetailMocks';
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


describe('useGetPlaceDetail()', () => {
    
    test('page display place detail data', async () => {
        const mockRouter = createMockRouter({
            query: { id: '1' }
        });

        const Wrapper = setupWrapper();
    
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    
        render(
            <Wrapper>
                <RouterContext.Provider value={mockRouter}>
                     <PlaceDetail />    
                </RouterContext.Provider>
            </Wrapper>
        );
    
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            `${endpoint.place}/${getParams.id}`,
            { headers: headers }
        );
    });

    test('post button request failed', async () => {
        const mockRouter = createMockRouter({
            query: { id: '1' }
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
    
        await waitFor(() => {
          expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        });
    });
});