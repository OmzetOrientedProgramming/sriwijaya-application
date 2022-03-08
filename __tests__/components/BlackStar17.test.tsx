import { render, screen } from '@testing-library/react';
import {StarFull, StarHalf, StarEmpty} from '../../components/Utils/BlackStar14';

describe('Test For BlackStar ', () => {
  test('renders StarFull', () => {
    render(<StarFull/>);
  });
  test('renders StarHalf', () => {
    render(<StarHalf/>);
  });
  test('renders StarEmpty', () => {
    render(<StarEmpty/>);
  });
});
