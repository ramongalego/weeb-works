import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Loading from '../Loading';

describe('Loading component', () => {
  it('renders the loading spinner', () => {
    render(<Loading />);

    screen.getByAltText('Loading Spinner');
  });
});
