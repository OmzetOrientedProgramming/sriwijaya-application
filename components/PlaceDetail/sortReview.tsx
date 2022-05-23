import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Drawer } from '../Drawer';
import Button from '../Utils/Button';
import 'twin.macro';

interface SortFormProps {
  sort: string;
  isSorted: boolean;
  setSort: any;
  setLatest: any;
  setRating: any;
  isOpen: any;
  setIsOpen: any;
  setPage: any;
}

const SortForm = ({
  sort,
  setSort,
  setLatest,
  setRating,
  isOpen,
  setIsOpen,
  setPage,
}: SortFormProps): JSX.Element => {
  const handleSubmit = (sort: string, isSorted: boolean) => {
    setSort(sort);
    setLatest(isSorted);
    setRating(!isSorted);
    setPage(1);
  };

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div tw="flex flex-col">
          <p tw="font-bold text-xl mb-4">Urutkan tempat berdasarkan</p>
          <form>
            <label tw="flex flex-row-reverse justify-between mb-2">
              <input
                onClick={(): void => {
                  handleSubmit('latest review', true);
                }}
                type="radio"
                name="sort"
                tw=" border-[#003366] text-blue-600"
                defaultChecked={sort === 'latest review'}
              />
              <p>Terbaru</p>
            </label>
            <label tw="flex flex-row-reverse justify-between mb-2">
              <input
                onClick={(): void => {
                  handleSubmit('Rating Review', false);
                }}
                type="radio"
                name="sort"
                tw=" border-[#003366] text-blue-600"
                defaultChecked={sort === 'Rating Review'}
              />
              <p>Rating</p>
            </label>
            <Button type="button" onClick={() => setIsOpen(false)}>
              Terapkan
            </Button>
          </form>
        </div>
      </Drawer>
      <Button onClick={() => setIsOpen(true)}>URUTKAN</Button>
    </>
  );
};

export default SortForm;
