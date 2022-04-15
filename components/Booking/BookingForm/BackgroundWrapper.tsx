import React from 'react';
import { styled } from 'twin.macro';

interface BackgroundWrapperProps {
  background?: string;
  children?: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = (props) => {
  const { background, children } = props;
  return (
    <div tw="w-full relative pb-16">
      {background && <StyledBackgroundDiv background={background} />}
      <div tw="mx-4">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;

const StyledBackgroundDiv = styled.div<
  Pick<BackgroundWrapperProps, 'background'>
>`
  position: relative;
  width: 100%;
  padding-top: 61.11%;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: 50% 50%;
`;
