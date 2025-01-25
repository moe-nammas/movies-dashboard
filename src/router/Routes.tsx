import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@layout/Layout';

const Movies = lazy(() => import('@pages/movies'));
const Home = lazy(() => import('@pages/home/Home'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
    ],
  },
]);
