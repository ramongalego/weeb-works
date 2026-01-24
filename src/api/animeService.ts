import axios from 'axios';

import { BASE_URL } from '../constants/fetchOptions';
import { AnimeData, AnimeListResponse } from '../types';

type FetchAnimeDataArgs = {
  page: number;
  filter: string | undefined;
  locationSearch: string;
  isAnyValueNotPresent: boolean;
};

export const fetchHighestRatedAnime = async (
  page: number,
  limit?: number,
): Promise<AnimeListResponse> => {
  const res = await axios.get<AnimeListResponse>(
    `${BASE_URL}/top/anime?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  return res.data;
};

export const fetchUpcomingAnime = async (
  page: number,
  limit?: number,
): Promise<AnimeListResponse> => {
  const res = await axios.get<AnimeListResponse>(
    `${BASE_URL}/seasons/upcoming?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  return res.data;
};

export const fetchAiringAnime = async (
  page: number,
  limit?: number,
): Promise<AnimeListResponse> => {
  const res = await axios.get<AnimeListResponse>(
    `${BASE_URL}/top/anime?filter=airing&page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  return res.data;
};

export const fetchMostPopularAnime = async (
  page: number,
  limit?: number,
): Promise<AnimeListResponse> => {
  const res = await axios.get<AnimeListResponse>(
    `${BASE_URL}/top/anime?filter=bypopularity&page=${page}${
      limit ? '&limit=' + limit : ''
    }&sfw=true`,
  );
  return res.data;
};

export const fetchAnimeById = async (id: string): Promise<AnimeData> => {
  const res = await axios.get<{ data: AnimeData }>(`${BASE_URL}/anime/${id}`);
  return res.data.data;
};

export const fetchAnimeGenres = async (): Promise<Array<{ mal_id: number; name: string }>> => {
  const res = await axios.get<{ data: Array<{ mal_id: number; name: string }> }>(
    `${BASE_URL}/genres/anime?filter=genres`,
  );
  return res.data.data;
};

export const fetchFilteredAnime = async (
  page: number,
  filterParams: string,
): Promise<AnimeListResponse> => {
  const res = await axios.get<AnimeListResponse>(
    `${BASE_URL}/anime${filterParams}&page=${page}&sfw=true`,
  );
  return res.data;
};

export const fetchAnimeData = async ({
  page,
  filter,
  locationSearch,
  isAnyValueNotPresent,
}: FetchAnimeDataArgs): Promise<AnimeListResponse> => {
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
