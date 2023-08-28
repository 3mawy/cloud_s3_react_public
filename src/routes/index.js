import { lazy } from 'react';

const BucketDetails = lazy(() => import('../pages/BucketDetails'));

const coreRoutes = [

  {
    path: '/buckets/:bucketName',
    title: 'BucketDetails',
    component: BucketDetails,
  }
];

const routes = [...coreRoutes];
export default routes;
