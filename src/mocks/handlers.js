import { http, HttpResponse } from 'msw';

import { animeDetailsResponse } from './data';

export const handlers = [
  http.get('https://api.jikan.moe/v4/anime/:id', () => {
    console.log('captured a GET anime/:id request');

    return HttpResponse.json(animeDetailsResponse);
  }),
];
