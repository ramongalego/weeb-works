import axios from 'axios';

export const fetchTopAnime = async (page, limit) => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/top/anime?page=${page}${limit ? '&limit=' + limit : ''}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchUpcomingAnime = async (page, limit) => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/seasons/upcoming?page=${page}${
      limit ? '&limit=' + limit : ''
    }&sfw=true`,
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
  const res = await axios.get(
    `https://api.jikan.moe/v4/anime${filterParams}&page=${page}&sfw=true`,
  );
  const data = res.data;

  return data;
};

export const fetchAnimeById = async id => {
  const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
  const data = res.data.data;

  return data;
};

export const fetchAnimeGenres = async () => {
  const res = await axios.get('https://api.jikan.moe/v4/genres/anime?filter=genres');
  const data = res.data.data;

  return data;
};
