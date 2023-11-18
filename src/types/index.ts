export type AnimeData = {
  mal_id: number;
  title_english: string;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  type: string;
  episodes: number;
  duration: string;
  status: string;
  score: number;
  year: number;
  season: string;
  source: string;
  rating: number;
  studios: [{ mal_id: number; name: string }];
  themes: [{ mal_id: number; name: string }];
  genres: [{ mal_id: number; name: string }];
};

export type GenreFilterOptions = {
  mal_id: number;
  name: string;
};
