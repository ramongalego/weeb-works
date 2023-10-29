import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SkeletonLoading from '../SkeletonLoading';

describe('SkeletonLoading component', () => {
  it('renders the skeleton loading component with 10 items', () => {
    render(<SkeletonLoading count={10} />);

    const skeletonLoadingItems = screen.getAllByTestId('skeleton-loading');
    expect(skeletonLoadingItems).toHaveLength(10);
  });
});
