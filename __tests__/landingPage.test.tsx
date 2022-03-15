import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Auth from '../pages/auth';
import { LandingPageWrapper } from '../__mocks__/landingPage/landingPageMocks';

// @ts-expect-error
global.IntersectionObserver = class FakeIntersectionObserver {
  observe() {}
  disconnect() {}
};

test('renders login button', () => {
  render(<Auth />);

  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('renders register button', () => {
  render(<Auth />);

  expect(screen.getByText('Register')).toBeInTheDocument();
});

test('onLogin()', async () => {
  render(
    <LandingPageWrapper>
      <Auth />
    </LandingPageWrapper>
  );

  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  });
});

test('onRegister()', async () => {
  render(
    <LandingPageWrapper>
      <Auth />
    </LandingPageWrapper>
  );

  fireEvent.click(screen.getByText('Register'));

  await waitFor(() => {
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  });
});
