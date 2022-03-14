import React from 'react';
import { styled } from 'twin.macro';

export interface MainHeaderProps {
  src: string;
  alt: string;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { src, alt } = props;
  return (
    <StyledMainHeader id="wave-main-header">
      <img src={src} alt={alt} />
    </StyledMainHeader>
  );
};

export default MainHeader;

const StyledMainHeader = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.25rem 0;
  height: 70px;
  width: 100%;
  max-width: 768px;
  background: #ffffff;
  border: 1px solid #cdcccc;

  img {
    width: auto;
    height: 28px;
  }
`;
