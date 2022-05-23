import React, { useState, useEffect, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import 'twin.macro';

import { useGetCatalog } from '../../../apis/hooks/catalogHooks';
import { handleScrollRefetch } from '../../../pages';
import CardCatalog from '../../Catalog/CardCatalog';
import SearchBar from '../../Catalog/SearchBar';
import BaseCartNavigation from './Cart/BaseCartNavigation';
import { StyledButton } from './InputVisitor';
import { BookingFormContext } from '.';

export interface IItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface BaseInputItemsProps {
  placeId: number;
}

export type InputItemsProps = BaseInputItemsProps;

const InputItems: React.FC<InputItemsProps> = ({ placeId }) => {
  const [items, setItems] = useState<Array<IItem>>([]);
  const [inputText, setInputText] = useState('');
  const [paginationState, setPaginationState] = useState({
    page: 1,
    isSearch: false,
  });

  const methods = useFormContext();
  const { setValue, watch } = methods;

  const formItems = watch('items');

  const { setActiveItem, setStep } = useContext(BookingFormContext);

  let totalPrice = 0;
  Object.values(formItems).forEach((item: any) => {
    totalPrice += item.price * item.qty;
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (paginationState.page == 1) {
      refetch();
    }
  }, [paginationState.page]);

  useEffect(() => {
    window.addEventListener('scroll', () => handleScrollRefetch(refetch));

    return () => {
      window.removeEventListener('scroll', () => handleScrollRefetch(refetch));
    };
  }, []);

  const { refetch } = useGetCatalog(
    {
      id: placeId.toString(),
      name: inputText,
      limit: 5,
      page: paginationState.page,
    },
    {
      onSuccess: (res: any) => {
        if (paginationState.isSearch) {
          setItems(res.data.data.items);
          setPaginationState((prev) => ({
            isSearch: false,
            page: prev.page,
          }));
        } else {
          setItems((oldItems) => oldItems.concat(res.data.data.items));
        }
        setPaginationState((prev) => ({
          isSearch: false,
          page: prev.page + 1,
        }));
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );
  return (
    <div tw="flex flex-col justify-center w-full mt-4 pb-28">
      <SearchBar
        onClick={() => {
          setPaginationState({
            isSearch: true,
            page: 1,
          });
          refetch();
        }}
        setInputText={setInputText}
        setPagination={setPaginationState}
      />
      {items.map((detail: IItem) => (
        <button
          key={detail.id}
          type="button"
          onClick={() => {
            setActiveItem({ ...detail, qty: formItems[detail.id]?.qty ?? 0 });
          }}
          tw="text-left"
        >
          <CardCatalog
            itemID={detail.id.toString()}
            name={detail.name}
            image={detail.image}
            price={detail.price}
            description={detail.description}
          >
            <div tw="flex justify-center items-center mt-2 space-x-4">
              <StyledButton
                data-testid="decrease-button"
                type="button"
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                  if (formItems[detail.id]) {
                    const currentItem = formItems[detail.id];
                    const newQty = currentItem.qty - 1;
                    if (newQty <= 0) {
                      delete formItems[detail.id];
                      setValue(`items`, formItems);
                    } else {
                      setValue(`items.${detail.id}.qty`, newQty);
                    }
                  }
                }}
              >
                <img tw="w-full h-full" src="/icon/minus.png" alt="decrease" />
              </StyledButton>
              <p>{formItems[detail.id]?.qty ?? 0}</p>
              <StyledButton
                data-testid="increase-button"
                type="button"
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                  if (formItems[detail.id]) {
                    const currentItem = formItems[detail.id];
                    const newQty = currentItem.qty + 1;
                    setValue(`items.${detail.id}.qty`, newQty);
                  } else {
                    setValue(`items.${detail.id}`, {
                      ...detail,
                      qty: 1,
                    });
                  }
                }}
              >
                <img tw="w-full h-full" src="/icon/plus.png" alt="increase" />
              </StyledButton>
            </div>
          </CardCatalog>
        </button>
      ))}
      <BaseCartNavigation
        onClick={() => setStep((prev: number) => prev + 1)}
        submitText="KERANJANG"
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default InputItems;
