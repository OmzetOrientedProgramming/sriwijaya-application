import { Dispatch, SetStateAction, useState } from 'react';
import { Drawer } from '../Drawer';
import Button from '../Utils/Button';
import 'twin.macro';
import { FilterData } from '../../pages';

interface FilterFormProps {
  filter: FilterData;
  setFilter: Dispatch<SetStateAction<FilterData>>;
}

const FilterForm = ({ filter, setFilter }: FilterFormProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = (): void => {
    setFilter({
      price: [],
      rating: [],
      people: [],
    });
  };

  const handleRating = (newItem: string): void => {
    const loc = filter.rating.indexOf(newItem);
    if (loc === -1) {
      setFilter({
        ...filter,
        rating: [...filter.rating, newItem],
      });
    } else {
      filter.rating.splice(loc, 1);
      setFilter({
        ...filter,
      });
    }
  };

  const handlePrice = (newItem: string): void => {
    const loc = filter.price.indexOf(newItem);
    if (loc === -1) {
      setFilter({
        ...filter,
        price: [...filter.price, newItem],
      });
    } else {
      filter.price.splice(loc, 1);
      setFilter({
        ...filter,
      });
    }
  };

  const handlePeople = (newItem: string): void => {
    const loc = filter.people.indexOf(newItem);
    if (loc === -1) {
      setFilter({
        ...filter,
        people: [...filter.people, newItem],
      });
    } else {
      filter.people.splice(loc, 1);
      setFilter({
        ...filter,
      });
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div tw="flex flex-col">
          <div tw="flex items-center justify-between mb-8 gap-4">
            <p tw="font-bold text-xl">Filter</p>
            <Button onClick={() => handleReset()}>Hapus Filter</Button>
          </div>
          <div>
            <fieldset tw="mb-4">
              <label tw="flex flex-row justify-between mb-2">
                <p>Kurang dari Rp16.000</p>
                <input
                  onClick={() => handlePrice('16000')}
                  type="checkbox"
                  value="16000"
                  tw="border-[#003366] text-blue-600"
                  name="price"
                  defaultChecked={filter.price.includes('16000')}
                />
              </label>
              <label tw="flex justify-between mb-2">
                <p>Rp16.000-Rp40.000</p>
                <input
                  onClick={() => handlePrice('16000-40000')}
                  type="checkbox"
                  value="16000-40000"
                  tw=" border-[#003366] text-blue-600 "
                  name="price"
                  defaultChecked={filter.price.includes('16000-40000')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>Rp40.000-Rp100.000</p>
                <input
                  onClick={() => handlePrice('40000-100000')}
                  type="checkbox"
                  value="40000-100000"
                  tw=" border-[#003366] text-blue-600"
                  name="price"
                  defaultChecked={filter.price.includes('40000-100000')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>Lebih dari Rp100.000</p>
                <input
                  onClick={() => handlePrice('100000')}
                  type="checkbox"
                  value="100000"
                  tw=" border-[#003366] text-blue-600"
                  name="price"
                  defaultChecked={filter.price.includes('100000')}
                />
              </label>
            </fieldset>

            <fieldset tw="mb-4">
              <label tw="flex flex-row justify-between mb-2">
                <p>1 orang</p>
                <input
                  onClick={() => handlePeople('1')}
                  type="checkbox"
                  value="1"
                  tw=" border-[#003366] text-blue-600"
                  name="people"
                  defaultChecked={filter.people.includes('1')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>2-4 orang</p>

                <input
                  onClick={() => handlePeople('2-4')}
                  type="checkbox"
                  value="2-4"
                  tw=" border-[#003366] text-blue-600"
                  name="people"
                  defaultChecked={filter.people.includes('2-4')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>5-10 orang</p>
                <input
                  onClick={() => handlePeople('5-10')}
                  type="checkbox"
                  value="5-10"
                  tw=" border-[#003366] text-blue-600"
                  name="people"
                  defaultChecked={filter.people.includes('5-10')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>Lebih dari 10 orang</p>
                <input
                  onClick={() => handlePeople('10')}
                  type="checkbox"
                  value="10"
                  tw=" border-[#003366] text-blue-600"
                  name="people"
                  defaultChecked={filter.people.includes('10')}
                />
              </label>
            </fieldset>

            <fieldset tw="mb-4">
              <label tw="flex flex-row justify-between mb-2">
                <p>5 star</p>
                <input
                  onClick={() => handleRating('5')}
                  type="checkbox"
                  value="5"
                  tw=" border-[#003366] text-blue-600"
                  name="rating"
                  defaultChecked={filter.rating.includes('5')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>4 star</p>
                <input
                  onClick={() => handleRating('4')}
                  type="checkbox"
                  value="4"
                  tw=" border-[#003366] text-blue-600"
                  name="rating"
                  defaultChecked={filter.rating.includes('4')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>3 star</p>
                <input
                  onClick={() => handleRating('3')}
                  type="checkbox"
                  value="3"
                  tw=" border-[#003366] text-blue-600"
                  name="rating"
                  defaultChecked={filter.rating.includes('3')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>2 star</p>
                <input
                  onClick={() => handleRating('2')}
                  type="checkbox"
                  value="2"
                  tw=" border-[#003366] text-blue-600"
                  name="rating"
                  defaultChecked={filter.rating.includes('2')}
                />
              </label>
              <label tw="flex flex-row justify-between mb-2">
                <p>1 star</p>
                <input
                  onClick={() => handleRating('1')}
                  type="checkbox"
                  value="1"
                  tw=" border-[#003366] text-blue-600"
                  name="rating"
                  defaultChecked={filter.rating.includes('1')}
                />
              </label>
            </fieldset>
            <Button onClick={() => setIsOpen(false)}>Terapkan</Button>
          </div>
        </div>
      </Drawer>
      <Button onClick={() => setIsOpen(true)}>FILTER</Button>
    </>
  );
};

export default FilterForm;
