import * as React from 'react';
import { render } from '@testing-library/react';

import { Clue2 } from '..';

describe('<Clue2  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Clue2 />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
