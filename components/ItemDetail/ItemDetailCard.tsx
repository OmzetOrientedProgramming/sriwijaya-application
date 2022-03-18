import React from 'react';
import 'twin.macro';
import { styled } from 'twin.macro';
import StyledImageDiv from '../Utils/StyledImageDiv';

interface ItemDetailCardProps {
  itemID: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

const ItemDetailCard: React.FC<ItemDetailCardProps> = (props) => {
  return (
    <>
      <StyledImageDiv src={props.image} />
      <StyledItemDetailCardContainer>
        <div tw="px-3 py-3 flex flex-col w-full">
          <p tw="text-2xl font-bold leading-tight">
            Rp{props.price.toLocaleString('id-ID')}
          </p>
          <p tw="text-xl font-normal overflow-hidden leading-normal">
            {props.name}
          </p>
          <div tw="px-3 py-3 w-full"></div>
          <p tw="text-base font-bold leading-tight">Deskripsi</p>
          <p tw="text-base font-normal leading-normal break-words">
            {props.description}
          </p>
        </div>
      </StyledItemDetailCardContainer>
    </>
  );
};

export default ItemDetailCard;

const StyledItemDetailCardContainer = styled.div`
  display: grid;
  margin: 1rem 1rem 1rem 1rem;
  border-radius: 0.6rem;
  overflow: hidden;
  align-items: center;
`;
