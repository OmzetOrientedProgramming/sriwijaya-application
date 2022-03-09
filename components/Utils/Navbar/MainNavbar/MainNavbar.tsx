import React from 'react';
import { styled } from 'twin.macro';

import MainNavbarItem, { MainNavbarItemProps } from './MainNavbarItem';

export interface MainNavbarProps {
  mainNavbarItems: Array<Omit<MainNavbarItemProps, 'active'>>;
  activeItemHref: string | null;
}

const MainNavbar: React.FC<MainNavbarProps> = (props) => {
  const { mainNavbarItems, activeItemHref } = props;
  return (
    <StyledMainNavbar id="wave-main-navbar">
      {mainNavbarItems.map((mainNavbarItem, key) => (
        <MainNavbarItem
          active={activeItemHref === mainNavbarItem.href}
          key={key}
          {...mainNavbarItem}
        />
      ))}
    </StyledMainNavbar>
  );
};

export default MainNavbar;

const StyledMainNavbar = styled.div`
  position: fixed;
  bottom: 0;

  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  height: 68px;
  width: 100%;
  max-width: 768px;
  background: #ffffff;
  border: 1px solid #cdcccc;
`;
