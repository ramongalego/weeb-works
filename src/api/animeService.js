import axios from 'axios';

import { BASE_URL } from '../constants/fetchOptions';

export const fetchHighestRatedAnime = async (page, limit) => {
  const res = await axios.get(
    `${BASE_URL}/top/anime?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchUpcomingAnime = async (page, limit) => {
  const res = await axios.get(
    `${BASE_URL}/seasons/upcoming?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchAiringAnime = async (page, limit) => {
  const res = await axios.get(
    `${BASE_URL}/top/anime?filter=airing&page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchMostPopularAnime = async (page, limit) => {
  const res = await axios.get(
    `${BASE_URL}/top/anime?filter=bypopularity&page=${page}${
      limit ? '&limit=' + limit : ''
    }&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchAnimeById = async id => {
  const res = await axios.get(`${BASE_URL}/anime/${id}`);
  const data = res.data.data;

  return data;
};

export const fetchAnimeGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genres/anime?filter=genres`);
  const data = res.data.data;

  return data;
};

export const fetchFilteredAnime = async (page, filterParams) => {
  const res = await axios.get(`${BASE_URL}/anime${filterParams}&page=${page}&sfw=true`);
  const data = res.data;

  return data;
};

export const fetchAnimeData = async ({ page, filter, locationSearch, isAnyValueNotPresent }) => {
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
