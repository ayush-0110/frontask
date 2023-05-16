import * as React from 'react';
import { render } from '@testing-library/react';

import { Clue1 } from '..';

describe('<Clue1  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Clue1 />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
