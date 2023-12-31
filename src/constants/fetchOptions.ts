export const BASE_URL = 'https://api.jikan.moe/v4';

export const QUERY_STALE_TIME = 60000 * 60;

export const INITIAL_PAGE = 1;

export const PREVIEW_LIMIT = 7;

export const ANIME_LIST_PREVIEW_CONFIG = {
  topAiring: {
    title: 'Top Airing',
    path: '/anime/airing',
  },
  topUpcoming: {
    title: 'Top Upcoming',
    path: '/anime/upcoming',
  },
  mostPopular: {
    title: 'Most Popular',
    path: '/anime/popular',
  },
  highestRated: {
    title: 'Highest Rated',
    path: '/anime/top',
  },
};
