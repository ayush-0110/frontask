/**
 *
 * Asynchronously loads the component for Clue2
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { Loading } from '../Loading';

interface Clue2Module {
  Clue2: React.ComponentType<any>;
}

const shouldDelay = true;
export const Clue2 = lazyLoad(
  () => {
    return new Promise((resolve, reject) => {
      if (shouldDelay) {
        setTimeout(() => {
          resolve(import('./index'));
        }, 3000);
      } else {
        resolve(import('./index'));
      }
    });
  },
  module => (module as Clue2Module).Clue2,
  {
    fallback: <Loading />,
  },
);
