import { cleanup, render, screen } from '@testing-library/react';
import Home from '../pages/index';

afterEach(cleanup);

test('renders a title', () => {
  render(<Home />);

  expect(screen.getByText('Wave')).toBeInTheDocument();
});
