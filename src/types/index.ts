export type AnimeData = {
  mal_id: number;
  title_english: string | null;
  title: string;
  synopsis: string | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  trailer: {
    embed_url: string | null;
  };
  type: string;
  episodes: number | null;
  duration: string;
  status: string;
  score: number | null;
  year: number | null;
  season: string | null;
  source: string;
  rating: string;
  studios: Array<{ mal_id: number; name: string }>;
  themes: Array<{ mal_id: number; name: string }>;
  genres: Array<{ mal_id: number; name: string }>;
};

export type GenreFilterOptions = {
  mal_id: number;
  name: string;
};

export type ApiPagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
};

export type AnimeListResponse = {
  pagination: ApiPagination;
  data: AnimeData[];
};
