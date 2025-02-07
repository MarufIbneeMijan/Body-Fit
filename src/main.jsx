import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
RouterProvider} from "react-router-dom";
import router from './Routes/Routes';
import AuthProvider from './Provider/AuthProvider';
import {  HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HelmetProvider>
  <QueryClientProvider client={queryClient} >
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
   </QueryClientProvider>
  </HelmetProvider>
  </StrictMode>,
)
