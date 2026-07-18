import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MonitoredProductPage from './pages/MonitoredProductPage.tsx'
import PriceHistoryPage from './pages/PriceHistoryPage.tsx'
import { Toaster } from 'react-hot-toast'
import Dashboard from './layouts/Dashboard.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import EmailVerifyPage from './pages/EmailVerifyPage.tsx'
import ProtectedRoute from './middleware/ProtectedRoute.tsx'
import VerifiedRoute from './middleware/VerifiedRoute.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <SignInPage /> },
  { path: '/signup', element: <SignUpPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/email-verify', element: <EmailVerifyPage /> },
      {
        element: <VerifiedRoute />,
        children: [
          {
            element: <Dashboard />,
            children: [
              { path: '/dashboard', element: <DashboardPage /> },
              { path: '/monitored-products', element: <MonitoredProductPage /> },
              { path: '/price-histories', element: <PriceHistoryPage /> },
            ]
          }
        ]
      }
    ]
  },
]);



createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster position="bottom-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>
)
