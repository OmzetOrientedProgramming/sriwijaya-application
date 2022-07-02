import React from 'react';
import 'twin.macro';
import { css, styled } from 'twin.macro';

interface CardCatalogProps {
  itemID: string;
  image: string;
  name: string;
  description: string;
  price: number;
}

const CardCatalog: React.FC<CardCatalogProps> = (props) => {
  return (
    <StyledCardCatalogContainer tw="shadow-md">
      <StyledCardImageDiv src={props.image} />
      <div tw="py-4 px-3 flex flex-col">
        <p
          tw="text-base font-normal overflow-hidden leading-normal"
          css={css`
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {props.name}
        </p>

        <div tw="mb-2">
          <p
            tw="text-xs font-light text-[#868686] leading-normal"
            css={css`
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {props.description}
          </p>
        </div>

        <p
          tw="text-base font-bold leading-tight"
          css={css`
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          Rp{props.price.toLocaleString('id-ID')}
        </p>
        {props.children}
      </div>
    </StyledCardCatalogContainer>
  );
};

export default CardCatalog;

const StyledCardCatalogContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
  margin: 1rem 1rem;
  border-radius: 0.6rem;
  overflow: hidden;
  align-items: center;
`;

interface StyledCardImageDivProps {
  src?: string;
}

const StyledCardImageDiv = styled.div<StyledCardImageDivProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: 50% 50%;
`;
