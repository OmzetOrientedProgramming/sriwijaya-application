import { render, screen } from '@testing-library/react';
import Offline from '../pages/_offline';

test('renders offline status', () => {
  render(<Offline />);

  expect(screen.getByText('Your device is offline')).toBeInTheDocument();
});
