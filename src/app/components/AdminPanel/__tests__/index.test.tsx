import * as React from 'react';
import { render } from '@testing-library/react';

import { AdminPanel } from '..';

describe('<AdminPanel  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AdminPanel />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
