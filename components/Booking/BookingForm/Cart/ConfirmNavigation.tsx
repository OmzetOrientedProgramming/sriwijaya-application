import React, { useCallback, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import toast from 'react-hot-toast';
import 'twin.macro';

import endpoint from '../../../../apis/endpoint';
import { usePostCreateBooking } from '../../../../apis/hooks/bookingHooks';
import { headers } from '../../../../apis/constants';
import { StyledButton } from '../InputVisitor';
import { BookingFormContext } from '..';
import BaseCartNavigation from './BaseCartNavigation';

interface BaseAddToCartNavigation {
  placeId: number;
}

export type AddToCartNavigationProps = BaseAddToCartNavigation;

const ConfirmNavigation: React.FC<AddToCartNavigationProps> = ({ placeId }) => {
  const methods = useFormContext();
  const { setActiveItem } = useContext(BookingFormContext);

  const {
    watch,
    formState: { errors },
    handleSubmit,
  } = methods;

  const formItems = watch('items');

  let totalPrice = 0;
  Object.values(formItems).forEach((item: any) => {
    totalPrice += item.price * item.qty;
  });

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
    <BaseCartNavigation
      submitText="KONFIRMASI"
      totalPrice={totalPrice}
      disabled={isDisabled || isLoading}
      onClick={() => {
        handleSubmit(onSubmit)();
      }}
      tw="height[124px]"
    />
  );
};

export default ConfirmNavigation;
