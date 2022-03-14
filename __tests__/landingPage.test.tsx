import { render, screen } from '@testing-library/react';
import Auth from '../pages/auth';

test('renders login button', () => {
  render(<Auth />);

  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('renders register button', () => {
  render(<Auth />);

  expect(screen.getByText('Register')).toBeInTheDocument();
});
