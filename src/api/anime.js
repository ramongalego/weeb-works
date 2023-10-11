import axios from 'axios';

export const fetchTopAnime = async (page, limit) => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/top/anime?page=${page}${limit ? '&limit=' + limit : ''}`,
  );
  const data = res.data;

  return data;
};

export const fetchUpcomingAnime = async (page, limit) => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/seasons/upcoming?page=${page}${limit ? '&limit=' + limit : ''}`,
  );
  const data = res.data;

  return data;
};

export const fetchAiringAnime = async (page, limit) => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true&page=${page}${
      limit ? '&limit=' + limit : ''
    }`,
  );
  const data = res.data;

  return data;
};

export const fetchFilteredAnime = async (page, filterParams) => {
  const res = await axios.get(`https://api.jikan.moe/v4/anime?${filterParams}&page=${page}`);
  const data = res.data;

  return data;
};
