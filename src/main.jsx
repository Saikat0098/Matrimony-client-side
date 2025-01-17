import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './Authentication/AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Toaster></Toaster>
    <QueryClientProvider client={queryClient} >
    <RouterProvider router={router}>
     
     </RouterProvider>
    </QueryClientProvider>
   
    </AuthProvider>
  </StrictMode>,
)
