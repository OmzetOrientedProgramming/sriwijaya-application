import StarRating  from '../../../components/PlaceDetail/goldenStarComponent';
import { render, screen } from '@testing-library/react';

describe('Test For GoldStar ', () => {
    test('renders StarFull', () => {
      render(<StarRating rating={2}/>);
    });
    test('renders StarHalf', () => {
      render(<StarRating rating={2.60}/>);
    });
});