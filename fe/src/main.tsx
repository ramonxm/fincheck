import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';
import { MainRouter } from './app/router/MainRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './app/contexts/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <MainRouter />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
