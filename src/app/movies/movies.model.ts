export type Movie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  overview: string;
}

export type MovieItem = {
  id: number;
  title: string;
  originalTitle: string;
  poster: string;
  releaseDate: string;
  overview: string;
}

const POSTER_PATH = 'https://media.themoviedb.org/t/p/w94_and_h141_bestv2';

export const toMovieItem = (movie: Movie): MovieItem => {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    poster: `${POSTER_PATH}${movie.poster_path}`,
    releaseDate: movie.release_date,
    overview: movie.overview,
  };
}

