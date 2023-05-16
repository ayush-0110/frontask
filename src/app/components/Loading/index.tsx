/**
 *
 * Loading
 *
 */
import * as React from 'react';
import loading from './loading.gif';
interface Props {}

export function Loading(props: Props) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={loading} alt="" />
    </div>
  );
}
