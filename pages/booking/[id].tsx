import React, { useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import 'twin.macro';

import withAuth from '../../components/Utils/AuthHOC/withAuth';
import { useGetPlaceDetail } from '../../apis/hooks/placeDetailHooks';
import { Layout } from '../../components/Utils/Layout';
import BookingForm from '../../components/Booking/BookingForm';
import { IItem } from '../../components/Booking/BookingForm/InputItems';

const Booking: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const [step, setStep] = useState<number>(1);
  const [activeItem, setActiveItem] = useState<
    (IItem & { qty: number }) | null
  >(null);
  let { id } = router.query;
  id = (id as string) || '';

  const params = {
    id,
  };

  const { data } = useGetPlaceDetail(params, {
    onError: (err: any) => {
      toast.error(err.response.data.message, { position: 'top-right' });
    },
  });

  const placeData = data?.data;

  return (
    <>
      <Head>
        <title>Booking Tempat</title>
      </Head>
      <Layout
        title="Booking"
        back
        hasNavbar={false}
        onBack={() => {
          if (activeItem !== null && step === 5) {
            setActiveItem(null);
          } else if (step > 1) {
            setStep((prev) => prev - 1);
          } else router.back();
        }}
      >
        {placeData && (
          <BookingForm
            step={step}
            setStep={setStep}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            placeData={placeData}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuth(Booking);
