import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export const useLoginController = () => {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm<FormData>();

  const handleSubmit = hookFormHandleSubmit(data => data);

  return { handleSubmit, register };
};
