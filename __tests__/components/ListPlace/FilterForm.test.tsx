import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import FilterForm from '../../../components/ListPlace/FilterForm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Filter form', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
  });

  it('should reset when reset button is clicked', async () => {
    let filter = {
      price: ['10000'],
      people: ['1'],
      rating: ['5'],
    };
    const setFilter = jest.fn(() => {
      filter = {
        price: [],
        people: [],
        rating: [],
      };
    });
    render(<FilterForm filter={filter} setFilter={setFilter} />);

    fireEvent.click(screen.getByText('FILTER'));
    fireEvent.click(screen.getByText('Hapus Filter'));

    expect(filter).toMatchObject({
      price: [],
      people: [],
      rating: [],
    });
  });
});
