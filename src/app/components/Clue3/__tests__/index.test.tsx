import * as React from 'react';
import { render } from '@testing-library/react';

import { Clue3 } from '..';

describe('<Clue3  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Clue3 />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
