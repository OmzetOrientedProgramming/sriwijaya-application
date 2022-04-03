import Head from 'next/head';
import tw, { styled, css } from 'twin.macro';

import { Layout } from '../../components/Utils/Layout';
import BookingCard from '../../components/BookingList/BookingCard'

export const handleScrollRefetch = (fetchNextPage: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    fetchNextPage();
  }
};

const BookingList: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Booking Saya - Wave</title>
      </Head>
      <div
        data-testid="wrapper"
        tw="mt-8 flex flex-col items-center justify-center w-full"
      >
      <div
      tw="w-full text-[16px] leading-normal font-bold"
      css={css`
        word-wrap: break-word;
        padding: 0 0 0 1rem;
      `}>
        Booking Terjadwal
      </div>
      <div tw="w-full">
        <BookingCard
            placeId = {1}
            image = {"string"}
            placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
            totalPrice = {1625000}
            rating = {0}
            status = {1}
            date = {new Date("2015-03-25T12:00:00Z")}
            endTime = {new Date("2015-03-25T12:00:00Z")}
            startTime = {new Date("2015-03-25T12:00:00Z")}
        />
      </div>
      <div tw="w-full">
        <BookingCard
            placeId = {1}
            image = {"string"}
            placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
            totalPrice = {1625000}
            rating = {0}
            status = {0}
            date = {new Date("2015-03-25T12:00:00Z")}
            endTime = {new Date("2015-03-25T12:00:00Z")}
            startTime = {new Date("2015-03-25T12:00:00Z")}
        />
        </div>
        <div tw="w-full">
          <BookingCard
              placeId = {1}
              image = {"string"}
              placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
              totalPrice = {1625000}
              rating = {0}
              status = {2}
              date = {new Date("2015-03-25T12:00:00Z")}
              endTime = {new Date("2015-03-25T12:00:00Z")}
              startTime = {new Date("2015-03-25T12:00:00Z")}
          />
        </div>
      </div>
      <div
        data-testid="wrapper"
        tw="mt-8 flex flex-col items-center justify-center w-full"
      >
        <div
        tw="w-full text-[16px] leading-normal font-bold"
        css={css`
          word-wrap: break-word;
          padding: 0 0 0 1rem;
        `}>
          Booking Sebelumnya
        </div>
        <div tw="w-full">
          <BookingCard
              placeId = {1}
              image = {"string"}
              placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
              totalPrice = {1625000}
              rating = {0}
              status = {4}
              date = {new Date("2015-03-25T12:00:00Z")}
              endTime = {new Date("2015-03-25T12:00:00Z")}
              startTime = {new Date("2015-03-25T12:00:00Z")}
          />
        </div>
        <div tw="w-full">
          <BookingCard
              placeId = {1}
              image = {"string"}
              placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
              totalPrice = {1625000}
              rating = {0}
              status = {3}
              date = {new Date("2015-03-25T12:00:00Z")}
              endTime = {new Date("2015-03-25T12:00:00Z")}
              startTime = {new Date("2015-03-25T12:00:00Z")}
          />
        </div>
        <div tw="w-full">
          <BookingCard
              placeId = {1}
              image = {"string"}
              placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
              totalPrice = {1625000}
              rating = {4}
              status = {5}
              date = {new Date("2015-03-25T12:00:00Z")}
              endTime = {new Date("2015-03-25T12:00:00Z")}
              startTime = {new Date("2015-03-25T12:00:00Z")}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookingList;