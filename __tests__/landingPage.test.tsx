import { render, screen } from '@testing-library/react';
import LandingPage from '../pages/landingPage';

test('renders login button', () => {
  render(<LandingPage />);

  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('renders register button', () => {
  render(<LandingPage />);

  expect(screen.getByText('Register')).toBeInTheDocument();
});
