import React, { useContext } from 'react';
import currency from 'currency.js';
import 'twin.macro';

import Button from '../../../Utils/Button';
import { BookingFormContext, renderStep } from '..';
import { StyledBaseCartNavigation } from './style';

const BaseCartNavigation: React.FC<any> = ({
  children,
  onClick,
  submitText,
  totalPrice,
  disabled = false,
  ...other
}) => {
  const { step, maxStep } = useContext(BookingFormContext);
  return (
    <StyledBaseCartNavigation tw="height[124px]" {...other} id="wave-cart-nav">
      {children}
      <div className="harga-wrapper">
        <div className="total-harga">
          <div tw="mb-1">{renderStep(step, maxStep)}</div>
          <p>Total Harga</p>
          <h3>
            {currency(totalPrice, {
              symbol: 'Rp',
              separator: '.',
              precision: 0,
            }).format()}
          </h3>
        </div>
        <div className="button-wrapper">
          <Button type="button" disabled={disabled} onClick={() => onClick()}>
            {submitText}
          </Button>
        </div>
      </div>
    </StyledBaseCartNavigation>
  );
};

export default BaseCartNavigation;
