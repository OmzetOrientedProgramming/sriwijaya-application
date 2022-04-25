import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import SortForm from '../../../components/ListPlace/SortForm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Sort form', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
  });

  it('should change sort option to populer when popular option is clicked', async () => {
    let sort = '';
    const setSort = jest.fn(() => {
      sort = 'popularity';
    });
    let location = {
      lat: 0,
      lng: 0,
    };
    const setLocation = jest.fn(() => {
      location = {
        lat: -23.564,
        lng: -46.654,
      };
    });

    render(
      <SortForm
        sort={sort}
        setSort={setSort}
        location={location}
        setLocation={setLocation}
      />
    );

    fireEvent.click(screen.getByText('URUTKAN'));
    fireEvent.click(screen.getByText('Populer'));

    expect(sort).toMatch('popularity');
  });

  it('should change sort option to distance when distance option is clicked', async () => {
    let sort = '';
    const setSort = jest.fn(() => {
      sort = 'distance';
    });
    let location = {
      lat: 0,
      lng: 0,
    };
    const setLocation = jest.fn(() => {
      location = {
        lat: -23.564,
        lng: -46.654,
      };
    });
    render(
      <SortForm
        sort={sort}
        setSort={setSort}
        location={location}
        setLocation={setLocation}
      />
    );

    fireEvent.click(screen.getByText('URUTKAN'));
    fireEvent.click(screen.getByText('Terdekat'));

    expect(sort).toMatch('distance');
  });

  it('should change sort option to recommended when recommended option is clicked', async () => {
    let sort = '';
    const setSort = jest.fn(() => {
      sort = 'recommended';
    });
    let location = {
      lat: 0,
      lng: 0,
    };
    const setLocation = jest.fn(() => {
      location = {
        lat: -23.564,
        lng: -46.654,
      };
    });
    render(
      <SortForm
        sort={sort}
        setSort={setSort}
        location={location}
        setLocation={setLocation}
      />
    );

    fireEvent.click(screen.getByText('URUTKAN'));
    fireEvent.click(screen.getByText('Terdekat'));
    fireEvent.click(screen.getByText('Disarankan'));

    expect(sort).toMatch('recommended');
  });
});
