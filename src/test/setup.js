import '@testing-library/jest-dom';

import { QueryCache } from '@tanstack/react-query';
import { beforeAll, afterEach, afterAll } from 'vitest';

import { server } from '../mocks/server';

const queryCache = new QueryCache();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());
