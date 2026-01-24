import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Error from '../Error';

describe('Error component', () => {
  it('renders without crashing', () => {
    const testMessage = 'Test error message';

    render(<Error message={testMessage} />);
    screen.getByText(testMessage);
  });

  it('displays the provided error message', () => {
    const testMessage = 'Another test error message';

    render(<Error message={testMessage} />);
    screen.getByText(testMessage);
  });
});
