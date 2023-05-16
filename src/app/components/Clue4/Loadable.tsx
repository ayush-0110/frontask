/**
 *
 * Asynchronously loads the component for Clue4
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { Loading } from '../Loading';

interface Clue4Module {
  Clue4: React.ComponentType<any>;
}

const shouldDelay = true;
export const Clue4 = lazyLoad(
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
  module => (module as Clue4Module).Clue4,
  {
    fallback: <Loading />,
  },
);
