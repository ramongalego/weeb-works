import axios from 'axios';

import { BASE_URL } from '../constants/fetchOptions';

type FetchAnimeDataArgs = {
  page: number;
  filter: string;
  locationSearch: string;
  isAnyValueNotPresent: boolean;
};

export const fetchHighestRatedAnime = async (page: number, limit?: number) => {
  const res = await axios.get(
    `${BASE_URL}/top/anime?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchUpcomingAnime = async (page: number, limit?: number) => {
  const res = await axios.get(
    `${BASE_URL}/seasons/upcoming?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchAiringAnime = async (page: number, limit?: number) => {
  const res = await axios.get(
    `${BASE_URL}/top/anime?filter=airing&page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchMostPopularAnime = async (page: number, limit?: number) => {
  const res = await axios.get(
    `${BASE_URL}/top/anime?filter=bypopularity&page=${page}${
      limit ? '&limit=' + limit : ''
    }&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchAnimeById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/anime/${id}`);
  const data = res.data.data;

  return data;
};

export const fetchAnimeGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genres/anime?filter=genres`);
  const data = res.data.data;

  return data;
};

export const fetchFilteredAnime = async (page: number, filterParams: string) => {
  const res = await axios.get(`${BASE_URL}/anime${filterParams}&page=${page}&sfw=true`);
  const data = res.data;

  return data;
};

export const fetchAnimeData = async ({
  page,
  filter,
  locationSearch,
  isAnyValueNotPresent,
}: FetchAnimeDataArgs) => {
  if (locationSearch && isAnyValueNotPresent) {
    return fetchFilteredAnime(page, locationSearch);
  } else {
    switch (filter) {
      case 'top':
        return fetchHighestRatedAnime(page);
      case 'upcoming':
        return fetchUpcomingAnime(page);
      case 'popular':
        return fetchMostPopularAnime(page);
      default:
        return fetchAiringAnime(page);
    }
  }
};
