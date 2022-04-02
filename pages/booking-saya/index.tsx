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

};

export default BookingList;