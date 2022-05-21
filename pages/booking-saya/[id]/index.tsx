import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Utils/Layout';
import StyledImageDiv from '../../../components/Utils/StyledImageDiv';
import moment from 'moment';
import 'moment/locale/id';
import currency from 'currency.js';
import Button from '../../../components/Utils/Button';
import { useGetBookingDetail } from '../../../apis/hooks/bookingDetailHooks';
import toast from 'react-hot-toast';
import Countdown from '../../../components/BookingList/Countdown';
import { css } from 'twin.macro';
import withAuth from '../../../components/Utils/AuthHOC/withAuth';

moment.locale('id');

const DetailBookingSaya: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { id } = router.query;

  let numberID: number = (id as unknown as number) || 0;

  const params = {
    bookingId: numberID,
  };

  const { data, status } = useGetBookingDetail(params, {
    onSuccess: (res: any) => {},
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  const booking = data?.data;

  return (
    <>
      <Head>
        <title>Booking Saya</title>
      </Head>

      <Layout title="Booking Saya" back={true}>
        <div tw="pt-0 pb-16 flex flex-col min-h-screen w-full">
          <div tw="my-4 mx-auto my-0 flex flex-col items-center justify-center">
            {status === 'success' && (
              <StyledImageDiv src={booking?.image}></StyledImageDiv>
            )}
          </div>

          <div tw="mx-6">
            <p tw="text-xs text-left">Booking No. {numberID}</p>
            <div tw="flex m-0">
              {parseBookingStatus(booking?.status)}
              {booking?.status === 1 && (
                <div tw="ml-2 flex items-center justify-center">
                  <div tw="w-4">
                    <img src="../icons/time-icon-red.png" />
                  </div>
                  <p
                    tw="text-[12px] leading-normal font-bold"
                    css={css`
                      word-wrap: break-word;
                      margin-left: 0.25rem;
                      margin-bottom: 0.25rem;
                      color: #fe3131;
                      position: relative;
                    `}
                  >
                    <Countdown expiredTime={booking?.expired_at} />
                  </p>
                </div>
              )}
            </div>
            <p tw="text-xl font-bold">{booking?.place_name}</p>

            <div tw="my-5">
              <p tw="font-bold text-[#003366]">Detail Waktu</p>
              <div tw="mx-4">
                <div tw="flex justify-between space-x-4">
                  <p tw="text-[#666666]">Tanggal</p>
                  <p tw="font-bold">
                    {moment(booking?.date, 'YYYY-MM-DDTHH:mm:ss')
                      .utc()
                      .format('dddd, DD MMM YYYY')}
                  </p>
                </div>
                <div tw="flex justify-between space-x-4">
                  <p tw="text-[#666666]">Waktu check-in</p>
                  <p tw="font-bold">
                    {' '}
                    {moment(booking?.start_time, 'YYYY-MM-DDTHH:mm:ss').format(
                      'HH:mm'
                    )}{' '}
                    WIB
                  </p>
                </div>
                <div tw="flex justify-between space-x-4">
                  <p tw="text-[#666666]">Waktu check-out</p>
                  <p tw="font-bold">
                    {moment(booking?.end_time, 'YYYY-MM-DDTHH:mm:ss').format(
                      'HH:mm'
                    )}{' '}
                    WIB
                  </p>
                </div>
              </div>
            </div>

            <div tw="mt-5 mb-2">
              <p tw="font-bold text-[#003366]">Detail Bayar</p>
              <div tw="mx-4">
                {booking?.items.map((item: any, key: any) => (
                  <div key={key}>
                    <div tw="flex justify-between space-x-4">
                      <p tw="text-[#666666]"> {item.name} </p>
                      <p tw="font-bold text-[#666666]">
                        {' '}
                        {currency(item.price, {
                          symbol: 'Rp',
                          decimal: ',',
                          separator: '.',
                          precision: 0,
                        }).format()}{' '}
                      </p>
                    </div>
                    <div tw="flex justify-between space-x-4">
                      <p tw="text-[#666666] mx-4"> x{item.qty} </p>
                      <p tw="font-bold">
                        {' '}
                        {currency(item.total_price, {
                          symbol: 'Rp',
                          decimal: ',',
                          separator: '.',
                          precision: 0,
                        }).format()}{' '}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr tw="border[1px solid #666666]" />

            <div tw="mx-4 mb-8">
              <div tw="flex justify-between space-x-4">
                <p tw="font-bold text-[#666666]">Total</p>
                <p tw="font-bold">
                  {currency(booking?.total_price, {
                    symbol: 'Rp',
                    decimal: ',',
                    separator: '.',
                    precision: 0,
                  }).format()}
                </p>
              </div>
            </div>

            <div tw="mx-4">
              <div tw="flex flex-col items-center space-y-4">
                {parseBookingStatusButton(booking?.status) ? (
                  <a tw="block w-full" href={booking?.invoices_url}>
                    <Button>Bayar</Button>
                  </a>
                ) : (
                  <Button disabled={true}>Bayar</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(DetailBookingSaya);

const parseBookingStatus: (status: number) => React.ReactNode = (status) => {
  switch (status) {
    case 0:
      return (
        <p tw="text-xs text-left font-bold text-[#003366]">
          Menunggu Konfirmasi Pemilik Tempat
        </p>
      );
    case 1:
      return (
        <p tw="text-xs text-left font-bold text-[#FE3131]">
          Menunggu Pembayaran
        </p>
      );
    case 2:
      return (
        <p tw="text-xs text-left font-bold text-[#03BD36]">Terkonfirmasi</p>
      );
    case 3:
      return <p tw="text-xs text-left font-bold text-[#03BD36]">Selesai</p>;
    case 4:
      return <p tw="text-xs text-left font-bold text-[#FE3131]">Gagal</p>;
    case 5:
      return <p tw="text-xs text-left font-bold text-[#03BD36]">Reviewed</p>;
    default:
      return '';
  }
};

const parseBookingStatusButton: (status: number) => React.ReactNode = (
  status
) => {
  if (status == 1) {
    return true;
  } else {
    return false;
  }
};
