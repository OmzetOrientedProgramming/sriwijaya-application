import { cleanup, render, screen } from '@testing-library/react';
import Home from '../pages/index';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';

afterEach(cleanup);

test('renders a title', () => {
  const mockRouter = createMockRouter({
    query: { session: 'Register' },
  });
  render(
    <RouterContext.Provider value={mockRouter}>
      <Home />
    </RouterContext.Provider>
  );

  expect(screen.getByText('Wave')).toBeInTheDocument();
});
