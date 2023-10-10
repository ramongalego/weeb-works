import axios from 'axios';

export const fetchTopAnime = async limit => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/top/anime${limit ? '?limit=' + limit : ''}`,
  );
  const data = res.data.data;

  return data;
};

export const fetchUpcomingAnime = async limit => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/seasons/upcoming${limit ? '?limit=' + limit : ''}`,
  );
  const data = res.data.data;

  return data;
};

export const fetchAiringAnime = async limit => {
  const res = await axios.get(
    `https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true${limit ? '&limit=' + limit : ''}`,
  );
  const data = res.data.data;

  return data;
};

export const fetchFilteredAnime = async filterParams => {
  const res = await axios.get(`https://api.jikan.moe/v4/anime${filterParams}`);
  const data = res.data.data;

  return data;
};
