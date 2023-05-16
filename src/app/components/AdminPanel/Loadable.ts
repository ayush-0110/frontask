/**
 *
 * Asynchronously loads the component for AdminPanel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AdminPanel = lazyLoad(
  () => import('./index'),
  module => module.AdminPanel,
);
