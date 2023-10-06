import axios from 'axios';

export const fetchTopAnime = async (limit = '') => {
  const res = await axios.get(`https://api.jikan.moe/v4/top/anime?limit=${limit}`);
  const data = res.data.data;

  return data;
};

export const fetchUpcomingAnime = async (limit = '') => {
  const res = await axios.get(`https://api.jikan.moe/v4/seasons/upcoming?limit=${limit}`);
  const data = res.data.data;

  return data;
};
