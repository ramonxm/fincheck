import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export const Input = (props: InputProps) => {
  return <input {...props} />;
};
