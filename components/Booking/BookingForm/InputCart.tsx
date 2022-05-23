import React, { useContext, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import toast from 'react-hot-toast';
import 'twin.macro';

import { usePostCreateBooking } from '../../../apis/hooks/bookingHooks';
import { headers } from '../../../apis/constants';
import endpoint from '../../../apis/endpoint';
import Button from '../../Utils/Button';
import CardCatalog from '../../Catalog/CardCatalog';
import ConfirmNavigation from './Cart/ConfirmNavigation';
import { IItem } from './InputItems';
import { StyledButton } from './InputVisitor';
import { BookingFormContext } from '.';

interface BaseInputCardProps {
  placeId: number;
}

export type InputCardProps = BaseInputCardProps;

const InputCart: React.FC<InputCardProps> = ({ placeId }) => {
  const methods = useFormContext();

  const {
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = methods;

  const { setActiveItem } = useContext(BookingFormContext);

  const items: { [key: number]: IItem & { qty: number } } = watch('items');

  const router = useRouter();

  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };

  const { mutateAsync, isLoading } = usePostCreateBooking();

  const isDisabled = JSON.stringify(errors) !== '{}';

  const onSubmit = useCallback(
    async ({ items, ...data }: any) => {
      const postCreateBookingParams = {
        placeId,
        ...data,
        items: Object.values(items),
      };
      try {
        const bookingResponse = await mutateAsync(postCreateBookingParams);
        if (bookingResponse.message === 'success') {
          toast.success('Sukses membuat booking!');
          router.push('/booking-saya');
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    [placeId]
  );

  return (
    <div tw="flex flex-col items-center justify-center w-full mt-4 pb-28">
      {Object.keys(items).length > 0 ? (
        Object.values(items).map((detail: IItem) => (
          <button
            key={detail.id}
            type="button"
            onClick={() => {
              setActiveItem(detail);
            }}
            tw="text-left w-full"
          >
            <CardCatalog
              itemID={detail.id.toString()}
              name={detail.name}
              image={detail.image}
              price={detail.price}
              description={detail.description}
            >
              <div tw="flex justify-between items-center mt-2">
                <StyledButton
                  data-testid="trash-button"
                  type="button"
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.stopPropagation();
                    delete items[detail.id];
                    setValue(`items`, items);
                  }}
                >
                  <img tw="w-full h-full" src="/icon/trash.png" alt="delete" />
                </StyledButton>
                <div tw="flex mt-1 space-x-4">
                  <StyledButton
                    data-testid="decrease-button"
                    type="button"
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      e.stopPropagation();
                      if (items[detail.id]) {
                        const currentItem = items[detail.id];
                        const newQty = currentItem.qty - 1;
                        if (newQty <= 0) {
                          delete items[detail.id];
                          setValue(`items`, items);
                        } else {
                          setValue(`items.${detail.id}.qty`, newQty);
                        }
                      }
                    }}
                  >
                    <img
                      tw="w-full h-full"
                      src="/icon/minus.png"
                      alt="decrease"
                    />
                  </StyledButton>
                  <p>{items[detail.id]?.qty ?? 0}</p>
                  <StyledButton
                    data-testid="increase-button"
                    type="button"
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      e.stopPropagation();
                      if (items[detail.id]) {
                        const currentItem = items[detail.id];
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
                    <img
                      tw="w-full h-full"
                      src="/icon/plus.png"
                      alt="increase"
                    />
                  </StyledButton>
                </div>
              </div>
            </CardCatalog>
            <ConfirmNavigation placeId={placeId} />
          </button>
        ))
      ) : (
        <div tw="mt-52 flex flex-col items-center justify-center max-w-[200px] space-y-4">
          <p tw="text-center font-semibold">
            Yakin registrasi tanpa beli barang dulu?
          </p>
          <Button
            type="button"
            disabled={isLoading || isDisabled}
            onClick={handleSubmit(onSubmit)}
          >
            Yakin
          </Button>
        </div>
      )}
    </div>
  );
};

export default InputCart;
