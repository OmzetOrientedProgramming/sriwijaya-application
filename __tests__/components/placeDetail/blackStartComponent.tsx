import { render, screen } from '@testing-library/react';
import StarRating  from '../../../components/PlaceDetail/blackStarComponent';

describe('Test For BlackStar ', () => {
  test('renders StarFull', () => {
    render(<StarRating rating={2}/>);
  });
  test('renders StarHalf', () => {
    render(<StarRating rating={2.60}/>);
  });
});


