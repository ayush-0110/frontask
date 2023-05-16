import * as React from 'react';
import { render } from '@testing-library/react';

import { Clue5 } from '..';

describe('<Clue5  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Clue5 />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
