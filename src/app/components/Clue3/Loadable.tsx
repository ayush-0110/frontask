/**
 *
 * Asynchronously loads the component for Clue3
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { Loading } from '../Loading';

interface Clue3Module {
  Clue3: React.ComponentType<any>;
}

const shouldDelay = true;
export const Clue3 = lazyLoad(
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
  module => (module as Clue3Module).Clue3,
  {
    fallback: <Loading />,
  },
);
