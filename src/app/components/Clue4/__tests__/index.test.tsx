import * as React from 'react';
import { render } from '@testing-library/react';

import { Clue4 } from '..';

describe('<Clue4  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Clue4 />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
