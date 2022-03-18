import React, { useState } from 'react';
import 'twin.macro';

interface SearchBarFunctionProps {
  onClick: any;
  setInputText: any;
  setPagination: any;
}

const SearchBar: React.FC<SearchBarFunctionProps> = (props) => {
  let inputHandler = (e: any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    props.setInputText(lowerCase);
    props.setPagination({
      isSearch: true,
      page: 1,
    });
  };

  return (
    <>
      <div tw="flex items-center justify-center">
        <div tw="mx-4 flex border-2 rounded w-full">
          <input
            type="text"
            tw="w-10/12 px-4 py-2"
            placeholder="Search..."
            onChange={inputHandler}
          />
          <button
            tw="w-2/12 flex items-center justify-center border-l"
            onClick={props.onClick}
          >
            <svg
              tw="w-6 h-6 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
