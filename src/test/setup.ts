import '@testing-library/jest-dom';
import { QueryCache } from '@tanstack/react-query';
import { beforeAll, afterEach, afterAll } from 'vitest';

import { server } from '../mocks/server';

// Mock IntersectionObserver for tests using react-intersection-observer
const mockIntersectionObserver = class {
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = (): IntersectionObserverEntry[] => [];
};
global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;

const queryCache = new QueryCache();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());
