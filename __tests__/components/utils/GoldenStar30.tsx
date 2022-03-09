import { render, screen } from '@testing-library/react';
import {StarFull, StarHalf, StarEmpty} from '../../../components/Utils/GoldenStar30';

describe('Test For Golden Star ', () => {
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
