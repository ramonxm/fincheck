import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../app/services/authService';
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export const useRegisterController = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({ mutationFn: authService.signup });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      const { accessToken } = await mutation.mutateAsync(data);

      signin(accessToken);
    } catch (error) {
      toast.error('Ocorreu um erro ao criar a sua conta!');
    }
  });

  return { handleSubmit, register, errors, isLoading: mutation.isPending };
};
