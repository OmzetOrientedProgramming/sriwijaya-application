import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Drawer } from '../Drawer';
import Button from '../Utils/Button';
import 'twin.macro';
import { Location } from '../../pages';

interface SortFormProps {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
}

const SortForm = ({
  sort,
  setSort,
  location,
  setLocation,
}: SortFormProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (sort: string) => {
    setSort(sort);
    setIsOpen(false);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }: GeolocationPosition) => {
          setLocation({
            lat: coords.latitude,
            lng: coords.longitude,
          });
          console.log(coords);
        }
      );
    }
  }, []);

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div tw="flex flex-col">
          <p tw="font-bold text-xl mb-4">Urutkan tempat berdasarkan</p>
          <form>
            <label tw="flex flex-row-reverse justify-between mb-2">
              <input
                onChange={(): void => {
                  handleSubmit('recommended');
                }}
                type="radio"
                tw=" border-[#003366] text-blue-600"
                defaultChecked={sort === 'recommended'}
              />
              <p>Disarankan</p>
            </label>
            <label tw="flex flex-row-reverse justify-between mb-2">
              <input
                onChange={(): void => {
                  handleSubmit('popularity');
                }}
                type="radio"
                tw=" border-[#003366] text-blue-600"
                defaultChecked={sort === 'popularity'}
              />
              <p>Populer</p>
            </label>
            <label tw="flex flex-row-reverse justify-between mb-2">
              <input
                onChange={(): void => {
                  handleSubmit('distance');
                }}
                type="radio"
                tw=" border-[#003366] text-blue-600"
                defaultChecked={sort === 'distance'}
              />
              <p>Terdekat</p>
            </label>
          </form>
        </div>
      </Drawer>
      <Button onClick={() => setIsOpen(true)}>URUTKAN</Button>
    </>
  );
};

export default SortForm;
