import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ListPlaces, { handleScrollRefetch } from '../pages/index';
import { QueryClient, QueryClientProvider } from 'react-query';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';
import axios from 'axios';
import { mockedResponse } from '../__mocks__/apis/listPlacesMocks';

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

describe('Filter UI', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });

    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <ListPlaces />
      </Wrapper>
    );
  });

  it('should has a "FILTER" button', () => {
    expect(screen.getByText('FILTER')).toBeInTheDocument();
  });

  it("should open the filter drawer when click on 'FILTER' button", () => {
    fireEvent.click(screen.getByText('FILTER'));

    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Hapus Filter')).toBeInTheDocument();
  });
});

describe('Sort UI', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });

    const Wrapper = setupWrapper();

    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn(),
      },
      writable: true,
    });

    render(
      <Wrapper>
        <ListPlaces />
      </Wrapper>
    );
  });

  it('should has a "URUTKAN" button', () => {
    expect(screen.getByText('URUTKAN')).toBeInTheDocument();
  });

  it("should open the filter drawer when click on 'URUTKAN' button", () => {
    fireEvent.click(screen.getByText('URUTKAN'));

    expect(screen.getByText('Urutkan tempat berdasarkan')).toBeInTheDocument();
  });

  describe("should ask for user's location", () => {
    test('successfully', () => {
      fireEvent.click(screen.getByText('URUTKAN'));

      (
        global.navigator.geolocation.getCurrentPosition as jest.Mock<any, any>
      ).mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 0,
              longitude: 0,
            },
          })
        )
      );

      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Category UI', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });

    const Wrapper = setupWrapper();

    render(
      <Wrapper>
        <ListPlaces />
      </Wrapper>
    );
  });

  it('should has a "CATEGORY" button', () => {
    expect(screen.getByText('KATEGORI')).toBeInTheDocument();
  });

  it("should open the filter drawer when click on 'KATEGORI' button", () => {
    fireEvent.click(screen.getByText('KATEGORI'));

    expect(screen.getByText('Kategori')).toBeInTheDocument();
  });
});
