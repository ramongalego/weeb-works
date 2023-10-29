import { http, HttpResponse } from 'msw';

import { animeDetails } from './responses';

export const handlers = [
  http.get('https://api.jikan.moe/v4/anime/:id', () => HttpResponse.json(animeDetails)),
];
