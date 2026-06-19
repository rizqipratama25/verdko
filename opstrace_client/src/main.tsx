import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MonitoredProductPage from './pages/MonitoredProductPage.tsx'
import PriceHistoryPage from './pages/PriceHistoryPage.tsx'
import { Toaster } from 'react-hot-toast'
import Dashboard from './layouts/Dashboard.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    element: <Dashboard />,
    children: [
      { path: '/monitored-products', element: <MonitoredProductPage /> },
      { path: '/price-histories', element: <PriceHistoryPage /> },
    ]
  }
]);



createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster position="bottom-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>
)
