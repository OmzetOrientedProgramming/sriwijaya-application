import { Dispatch, SetStateAction, useState } from 'react';
import { Drawer } from '../Drawer';
import Button from '../Utils/Button';
import 'twin.macro';
import tw from 'twin.macro';

interface CategoryFormProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryForm = ({
  category,
  setCategory,
}: CategoryFormProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (category: string): void => {
    setCategory(category);
    setIsOpen(false);
  };

  const handleReset = () => {
    setCategory('');
    setIsOpen(false);
  };

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div tw="flex flex-col">
          <div tw="flex items-center justify-between mb-8 gap-4">
            <p tw="font-bold text-xl">Kategori</p>
            <Button onClick={() => handleReset()}>Hapus Kategori</Button>
          </div>
          <div tw="grid grid-cols-3 gap-2 mb-4">
            <button
              tw="py-2.5 px-3 border border-[#BDBDBD] rounded"
              onClick={() => handleClick('indoor')}
              css={[category === 'indoor' && tw`bg-[#F5F5F5]`]}
            >
              Indoor
            </button>
            <button
              tw="py-2.5 px-3 border border-[#BDBDBD] rounded"
              onClick={() => handleClick('outdoor')}
              css={[category === 'outdoor' && tw`bg-[#F5F5F5]`]}
            >
              Outdoor
            </button>
            <button
              tw="py-2.5 px-3 border border-[#BDBDBD] rounded"
              onClick={() => handleClick('smoking')}
              css={[category === 'smoking' && tw`bg-[#F5F5F5]`]}
            >
              Smoking
            </button>
            <button
              tw="py-2.5 px-3 border border-[#BDBDBD] rounded"
              onClick={() => handleClick('non-smoking')}
              css={[category === 'non-smoking' && tw`bg-[#F5F5F5]`]}
            >
              Non-smoking
            </button>
          </div>
        </div>
      </Drawer>
      <Button onClick={() => setIsOpen(true)}>KATEGORI</Button>
    </>
  );
};

export default CategoryForm;
