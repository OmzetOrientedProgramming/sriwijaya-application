import React from 'react';
import Link from 'next/link';
import { styled } from 'twin.macro';

export interface MainNavbarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  href: string;
}

const MainNavbarItem: React.FC<MainNavbarItemProps> = (props) => {
  const { href, icon, text, active } = props;
  return (
    <Link href={href}>
      <a tw="flex justify-center items-center min-w-[6.25rem] py-2 flex-col space-y-1">
        <StyledSVGWrapper active={active}>{icon}</StyledSVGWrapper>
        <StyledMainNavbarItemP active={active}>{text}</StyledMainNavbarItemP>
      </a>
    </Link>
  );
};

export default MainNavbarItem;

const StyledSVGWrapper = styled.div<Pick<MainNavbarItemProps, 'active'>>`
  svg > path {
    fill: ${(props) => (props.active ? '#003366' : '#707070')};
  }
`;

const StyledMainNavbarItemP = styled.p<Pick<MainNavbarItemProps, 'active'>>`
  color: ${(props) => (props.active ? '#003366' : '#707070')};
  font-size: 0.75rem;
`;
