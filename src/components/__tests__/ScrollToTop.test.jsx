import { render } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop component', () => {
  it('scrolls to top on location change', () => {
    const mockScrollTo = vi.spyOn(globalThis.window, 'scrollTo').mockImplementation(() => {});

    render(
      <Router initialEntries={['/']}>
        <Routes>
          <Route path='*' element={<ScrollToTop />} />
        </Routes>
      </Router>,
    );

    window.history.pushState({}, '', '/some-path');

    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    mockScrollTo.mockRestore();
  });
});
