import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef, useId } from 'react';

interface InputProps extends ComponentProps<'input'> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, error, ...props }, ref) => {
  const id = useId();

  return (
    <div className="relative">
      <input
        {...props}
        id={id}
        ref={ref}
        className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 text-xs top-2 left-[13px] pointer-events-none text-gray-700">
        {placeholder}
      </label>
      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
