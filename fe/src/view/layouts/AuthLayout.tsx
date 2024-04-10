import { Outlet } from 'react-router-dom';
import illustration from '../../assets/illustration.png';
import { Logo } from '../components/Logo';

export const AuthLayout = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full flex items-center justify-center flex-col gap-16">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-md px-8 lg:px-0">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2 h-full justify-center items-center p-8 relative lg:flex hidden">
        <img
          src={illustration}
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] p-8 select-none rounded-[32px]"
        />
        <div className="max-w-[656px] bottom-8 p-10 bg-white absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
};
