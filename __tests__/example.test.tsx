import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

import Example from '../pages/example';
import { headers } from '../api/constants';
import {
  getParams,
  mockedResponse,
  postParams,
} from '../__mocks__/api/exampleMocks';

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

describe('useGetExample()', () => {
  test('page display data requested', async () => {
    const Wrapper = setupWrapper();

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    render(
      <Wrapper>
        <Example />
      </Wrapper>
    );

    expect(screen.getByText('Loading data . . .')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('b@gmail.com')).toBeInTheDocument();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://reqres.in/api/users',
      { headers: headers, params: getParams }
    );
  });

  test('page failed to display data requested', async () => {
    const Wrapper = setupWrapper();

    mockedAxios.get.mockReturnValueOnce(
      Promise.reject({ mesage: 'Get Error' })
    );

    render(
      <Wrapper>
        <Example />
      </Wrapper>
    );

    expect(screen.getByText('Loading data . . .')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('b@gmail.com')).not.toBeInTheDocument();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});

describe('usePostExample()', () => {
  test('post button request successful', async () => {
    const Wrapper = setupWrapper();

    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

    render(
      <Wrapper>
        <Example />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Click to Post'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://reqres.in/api/users',
        { headers: headers, params: postParams }
      );
    });
  });

  // Test expect not actually helpful yet
  test('post button request failed', async () => {
    const Wrapper = setupWrapper();

    mockedAxios.post.mockRejectedValueOnce({ message: 'Post Error' });

    render(
      <Wrapper>
        <Example />
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Click to Post'));

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});

describe('user interface component', () => {
  test('button link exist', async () => {
    const Wrapper = setupWrapper();
    render(
      <Wrapper>
        <Example />
      </Wrapper>
    );

    expect(screen.getByText('Back to Home')).toBeInTheDocument();
    expect(screen.getByText('Click to Post')).toBeInTheDocument();
  });
});
