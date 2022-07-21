import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from "react-query/devtools";
import App from './App';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root')!);
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      {/* <ReactQueryDevtools /> */}
    </BrowserRouter>
  </QueryClientProvider>
);
