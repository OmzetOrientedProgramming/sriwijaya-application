import React from 'react';
import tw, { css } from 'twin.macro';

interface ButtonProps {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      css={[
        css`
          box-shadow: 0px 3px 0px 0px #888888;
          border: 2px solid #003366;
          font-size: 18px;
          border-radius: 10px;
        `,
        tw`w-full h-9 font-bold background[#003366] text-white disabled:(shadow-none background[#888888] border[2px solid #888888])`,
      ]}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
