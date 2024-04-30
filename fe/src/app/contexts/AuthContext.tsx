import { createContext, PropsWithChildren } from 'react';

interface AuthContextValue {
  signedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return <AuthContext.Provider value={{ signedIn: true }}>{children}</AuthContext.Provider>;
};
