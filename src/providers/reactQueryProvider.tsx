'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

interface ReactQueryProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient();

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
