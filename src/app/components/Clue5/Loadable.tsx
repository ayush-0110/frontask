/**
 *
 * Asynchronously loads the component for Clue5
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { Loading } from '../Loading';

interface Clue5Module {
  Clue5: React.ComponentType<any>;
}

const shouldDelay = true;
export const Clue5 = lazyLoad(
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
  module => (module as Clue5Module).Clue5,
  {
    fallback: <Loading />,
  },
);
