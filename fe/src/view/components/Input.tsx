import { ComponentProps, useId } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export const Input = ({ placeholder, ...props }: InputProps) => {
  const id = useId();

  return (
    <div className="relative">
      <input
        {...props}
        id={id}
        className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 text-xs top-2 left-[13px] pointer-events-none text-gray-700">
        {placeholder}
      </label>
    </div>
  );
};
