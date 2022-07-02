import { act, cleanup, render, screen } from '@testing-library/react';
import Success from '../pages/auth/success';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../__mocks__/test-utils/createMockRouter';

jest.setTimeout(15000);

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders correct status and redirects after some time', async () => {
  const mockRouter = createMockRouter({
    query: { session: 'register' },
  });

  render(
    <RouterContext.Provider value={mockRouter}>
      <Success />;
    </RouterContext.Provider>
  );

  expect(screen.getByText('register')).toBeInTheDocument();
  expect(screen.getByText('berhasil!')).toBeInTheDocument();

  await act(async () => {
    await new Promise<void>((res) =>
      setTimeout(() => {
        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(mockRouter.push).toHaveBeenCalledWith('/');
        res();
      }, 5000)
    );
  });
});
