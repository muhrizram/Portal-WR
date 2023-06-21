import React, {lazy} from 'react'

const LoginScreen = lazy(() => import('./Layouts/Login'))
const Dashboard = lazy(() => import('./Layouts/Dashboard'))

export const routes = [
  {
    path: '/',
    element: <LoginScreen />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  }
]
