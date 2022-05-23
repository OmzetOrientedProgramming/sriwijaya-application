import React from 'react';
import 'twin.macro';

import { IItem } from './InputItems';
import ItemDetailCard from '../../ItemDetail/ItemDetailCard';
import AddToCartNavigation from './Cart/AddToCartNavigation';

interface BaseInputDetailItemProps {
  item: IItem & { qty: number };
}

export type InputDetailItemProps = BaseInputDetailItemProps;

const InputDetailItem: React.FC<InputDetailItemProps> = (props) => {
  const { item } = props;
  return (
    <div tw="flex flex-col justify-center w-full mt-4 pb-28">
      <div>
        <ItemDetailCard
          itemID={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          description={item.description}
        />
      </div>
      <AddToCartNavigation item={item} />
    </div>
  );
};

export default InputDetailItem;
