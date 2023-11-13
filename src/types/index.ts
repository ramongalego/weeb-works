export type AnimeData = {
  mal_id: number;
  title_english: string;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
};

export type GenreFilterOptions = {
  mal_id: number;
  name: string;
};
