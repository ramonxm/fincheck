import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authService } from '../../../app/services/authService';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export const useLoginController = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({ mutationFn: authService.signin });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async data => {
    try {
      const { accessToken } = await mutation.mutateAsync(data);

      signin(accessToken);
    } catch (error) {
      toast.error('Credenciais inválidas');
    }
  });

  return { handleSubmit, register, errors, isLoading: mutation.isPending };
};
