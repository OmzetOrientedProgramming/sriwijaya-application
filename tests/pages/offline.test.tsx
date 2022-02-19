import { cleanup, render, screen } from '@testing-library/react';
import Offline from '../../pages/_offline';
import renderer from 'react-test-renderer';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

// test('expect true', () => {
//   const { queryByLabelText, getByLabelText } = render(<Example />);
//   expect(true).toBeTruthy();
// });

test('renders offline status', () => {
  // const component = renderer.create(<Example />);
  render(<Offline />);
  // const welcome = <h1>Display Active Users Account Details</h1>;

  expect(screen.getByText('Your device is offline')).toBeInTheDocument();
});
