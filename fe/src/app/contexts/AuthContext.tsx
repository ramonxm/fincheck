import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { httpClient } from '../services/httpClient';

interface AuthContextValue {
  signedIn: boolean;
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

  useQuery({ queryFn: usersService.me, queryKey: ['loggedUser'], enabled: signedIn });

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
  return <AuthContext.Provider value={{ signedIn, signin, signout }}>{children}</AuthContext.Provider>;
};
