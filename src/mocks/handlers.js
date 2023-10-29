import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../constants/fetchOptions';

import { animeList, animeDetails, animeGenres } from './responses';

export const handlers = [
  http.get(`${BASE_URL}/top/anime`, () => HttpResponse.json(animeList)),
  http.get(`${BASE_URL}/seasons/upcoming`, () => HttpResponse.json(animeList)),
  http.get(`${BASE_URL}/anime/:id`, () => HttpResponse.json(animeDetails)),
  http.get(`${BASE_URL}/genres/anime`, () => HttpResponse.json(animeGenres)),
];
