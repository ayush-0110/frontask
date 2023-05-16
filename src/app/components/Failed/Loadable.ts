/**
 *
 * Asynchronously loads the component for Failed
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Failed = lazyLoad(
  () => import('./index'),
  module => module.Failed,
);
