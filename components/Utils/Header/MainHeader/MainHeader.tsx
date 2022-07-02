import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'twin.macro';

export interface MainHeaderProps {
  src: string;
  alt: string;
  title?: string;
  back?: boolean;
  onBack?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { src, alt, title, back, onBack = () => router.back() } = props;
  const router = useRouter();
  return (
    <StyledMainHeader id="wave-main-header">
      {title === undefined ? (
        <div tw="flex justify-center items-center">
          <img src={src} alt={alt} />
        </div>
      ) : (
        <div tw="flex mx-4 items-center">
          <div tw="flex-1">
            {back === true && (
              <img
                tw="hover:cursor-pointer"
                src="/images/bx-arrow-back.svg"
                alt="back"
                onClick={onBack}
              />
            )}
          </div>
          <h1 tw="text-2xl color[#003366] font-bold">{title}</h1>
          <div tw="flex-1"></div>
        </div>
      )}
    </StyledMainHeader>
  );
};

export default MainHeader;

const StyledMainHeader = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;

  // display: flex;
  // justify-content: center;
  // align-items: center;

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
