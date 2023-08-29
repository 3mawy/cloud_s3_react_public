import { lazy } from 'react';
import Dashboard from "../pages/Dashboard.jsx";

const BucketDetails = lazy(() => import('../pages/BucketDetails'));

const coreRoutes = [

  {
    path: '/buckets/:bucketName',
    title: 'BucketDetails',
    component: BucketDetails,
  },
  {
    path: '/',
    title: 'Dashboard',
    component: Dashboard,
  }
];

const routes = [...coreRoutes];
export default routes;
