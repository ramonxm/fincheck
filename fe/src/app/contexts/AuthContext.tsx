import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { httpClient } from '../services/httpClient';
import { LaunchScreen } from '../../view/components/LaunchScreen';
import { User } from '../entities/user';
import toast from 'react-hot-toast';

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return Boolean(storedAccessToken);
  });

  const setAccessToken = useCallback((accessToken: string) => {
    httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }, []);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, [setAccessToken]);

  const { data, isFetching, isError } = useQuery({
    queryFn: usersService.me,
    queryKey: ['loggedUser'],
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback(
    (accessToken: string) => {
      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
      setAccessToken(accessToken);

      setSignedIn(true);
    },
    [setAccessToken],
  );

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout, user: data }}>
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
};
