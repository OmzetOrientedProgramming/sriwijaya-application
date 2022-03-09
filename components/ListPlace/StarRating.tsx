import React from 'react';
import { StarFull, StarEmpty, StarHalf } from "../Utils/GoldenStar17"
import { styled, css } from 'twin.macro';

interface StarRatingProps {
    rating: number
}

const StarRating: React.FC<StarRatingProps> = (props) => {
    const modulo1 = props.rating % 1
    const modulo05 = props.rating % 0.5

    const countFullStar = props.rating - modulo1
    const countHalfStar = (props.rating - countFullStar - modulo05) * 2
    const countEmptyStar = 5 - countFullStar - countHalfStar

    return (
        <div tw="flex flex-row">
            {countFullStar>0 && [...Array(countFullStar)].map((e, i) => <StarFull key={i}/>)}
            {countHalfStar>0 && [...Array(countHalfStar)].map((e, i) => <StarHalf key={i}/>)}
            {countEmptyStar>0 && [...Array(countEmptyStar)].map((e, i) => <StarEmpty key={i}/>)}
        </div>
    )
}

export default StarRating;