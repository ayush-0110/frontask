import * as React from 'react';
import { render } from '@testing-library/react';

import { Failed } from '..';

describe('<Failed  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Failed />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
