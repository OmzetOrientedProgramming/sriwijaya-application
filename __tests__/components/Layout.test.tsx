import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../../__mocks__/test-utils/createMockRouter';
import { Layout } from '../../components/Utils/Layout';

jest.setTimeout(15000);

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Rendering', () => {
  console.error = jest.fn();

  describe('Layout', () => {
    const mockRouter = createMockRouter({
      query: { session: 'Register' },
    });
    it('renders children properly', () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <Layout>children</Layout>
        </RouterContext.Provider>
      );
      expect(screen.getByText('children')).toBeInTheDocument();
      expect(document.getElementById('wave-network-detector')).not.toBeNull();
    });
  });
  describe('Offline', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'onLine', {
        configurable: true,
        value: false,
      });
    });
    const mockRouter = createMockRouter({
      query: { session: 'Register' },
    });
    it('should render popup when offline', () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <Layout>children</Layout>
        </RouterContext.Provider>
      );
      expect(screen.getByText('You are currently offline')).toBeInTheDocument();
    });
  });
  describe('Navigation', () => {
    it('renders home to be active when pathname is home', () => {
      const mockRouter = createMockRouter({
        pathname: '/',
      });
      render(
        <RouterContext.Provider value={mockRouter}>
          <Layout>children</Layout>
        </RouterContext.Provider>
      );
      const homeDOM = screen.getByText('Beranda');
      expect(homeDOM).toHaveStyle('color: #003366;');
    });
    it('renders none to be active when pathname is not in any of the navbar', () => {
      const mockRouter = createMockRouter({
        pathname: '/asdfasdf',
      });
      render(
        <RouterContext.Provider value={mockRouter}>
          <Layout>children</Layout>
        </RouterContext.Provider>
      );
      const homeDOM = screen.getByText('Beranda');

      expect(homeDOM).not.toHaveStyle('color: #003366;');
    });
  });
});
