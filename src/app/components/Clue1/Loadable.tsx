/**
 *
 * Asynchronously loads the component for Clue1
 *
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { Loading } from '../Loading';

interface Clue1Module {
  Clue1: React.ComponentType<any>;
}

const shouldDelay = true;
export const Clue1 = lazyLoad(
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
  module => (module as Clue1Module).Clue1,
  {
    fallback: <Loading />,
  },
);
