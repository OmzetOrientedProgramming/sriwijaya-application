import React, { useEffect, useState, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import 'twin.macro';

import BaseCartNavigation from './BaseCartNavigation';
import { IItem } from '../InputItems';
import { StyledButton } from '../InputVisitor';
import { BookingFormContext } from '..';

interface BaseAddToCartNavigation {
  item: IItem & { qty: number };
}

export type AddToCartNavigationProps = BaseAddToCartNavigation;

const AddToCartNavigation: React.FC<AddToCartNavigationProps> = ({ item }) => {
  const methods = useFormContext();
  const [currentItem, setCurrentItem] = useState<
    (IItem & { qty: number }) | null
  >(null);
  const { setActiveItem } = useContext(BookingFormContext);

  const { setValue } = methods;

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  return (
    currentItem && (
      <BaseCartNavigation
        submitText="+KERANJANG"
        totalPrice={currentItem.qty * currentItem.price}
        onClick={() => {
          setValue(`items.${currentItem.id}`, currentItem);
          setActiveItem(null);
        }}
        tw="height[194px]"
      >
        <div tw="height[71px] w-full flex justify-center items-center mt-1 space-x-4 border-top[1px solid #cdcccc]">
          <StyledButton
            data-testid="decrease-button"
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
              const newQty = currentItem.qty - 1;
              if (newQty >= 0)
                setCurrentItem((prev: any) => ({ ...prev, qty: newQty }));
            }}
          >
            <img tw="w-full h-full" src="/icon/minus.png" alt="decrease" />
          </StyledButton>
          <p>{currentItem.qty}</p>
          <StyledButton
            data-testid="increase-button"
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
              const newQty = currentItem.qty + 1;
              setCurrentItem((prev: any) => ({ ...prev, qty: newQty }));
            }}
          >
            <img tw="w-full h-full" src="/icon/plus.png" alt="increase" />
          </StyledButton>
        </div>
      </BaseCartNavigation>
    )
  );
};

export default AddToCartNavigation;
