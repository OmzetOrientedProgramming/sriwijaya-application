import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { expect } from '@jest/globals';
import CategoryForm from '../../../components/ListPlace/CategoryForm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Category form', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
  });

  it('should reset data when reset button is clicked', async () => {
    let category = '';
    const setCategory = jest.fn(() => {
      category = '';
    });
    render(<CategoryForm category={category} setCategory={setCategory} />);

    fireEvent.click(screen.getByText('KATEGORI'));
    fireEvent.click(screen.getByText('Indoor'));

    fireEvent.click(screen.getByText('Hapus Kategori'));
    expect(category).toMatch('');
  });

  it('should change category data to indoor when indoor option is clicked', async () => {
    let category = '';
    const setCategory = jest.fn(() => {
      category = 'indoor';
    });
    render(<CategoryForm category={category} setCategory={setCategory} />);

    fireEvent.click(screen.getByText('KATEGORI'));
    fireEvent.click(screen.getByText('Indoor'));
    expect(setCategory).toHaveBeenCalledWith('indoor');
    expect(category).toMatch('indoor');
  });

  it('should change category data to outdoor when outdoor option is clicked', async () => {
    let category = '';
    const setCategory = jest.fn(() => {
      category = 'outdoor';
    });
    render(<CategoryForm category={category} setCategory={setCategory} />);

    fireEvent.click(screen.getByText('KATEGORI'));
    fireEvent.click(screen.getByText('Outdoor'));
    expect(setCategory).toHaveBeenCalledWith('outdoor');
    expect(category).toMatch('outdoor');
  });

  it('should change category data to smoking when smoking option is clicked', async () => {
    let category = '';
    const setCategory = jest.fn(() => {
      category = 'smoking';
    });
    render(<CategoryForm category={category} setCategory={setCategory} />);

    fireEvent.click(screen.getByText('KATEGORI'));
    fireEvent.click(screen.getByText('Smoking'));
    expect(setCategory).toHaveBeenCalledWith('smoking');
    expect(category).toMatch('smoking');
  });

  it('should change category data to non-smoking when non-smoking option is clicked', async () => {
    let category = '';
    const setCategory = jest.fn(() => {
      category = 'non-smoking';
    });
    render(<CategoryForm category={category} setCategory={setCategory} />);

    fireEvent.click(screen.getByText('KATEGORI'));
    fireEvent.click(screen.getByText('Non-smoking'));
    expect(setCategory).toHaveBeenCalledWith('non-smoking');
    expect(category).toMatch('non-smoking');
  });
});
