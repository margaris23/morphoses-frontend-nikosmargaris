export type Movie = {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_count: number;
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
  votes: { avg: string; count: number };
  genres: string;
}

export type Genre = {
  id: number;
  name: string;
}

const POSTER_PATH = 'https://media.themoviedb.org/t/p/w94_and_h141_bestv2';

export const toMovieItem = (genres: Map<number, string>) => (movie: Movie): MovieItem => {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    poster: `${POSTER_PATH}${movie.poster_path}`,
    releaseDate: movie.release_date,
    overview: movie.overview,
    votes: {
      avg: `${movie.vote_average.toFixed(1)}%`,
      count: movie.vote_count
    },
    genres: movie.genre_ids.map(genre => genres.get(genre)!).join(", ")
  };
}

export const toGenreMap = (genres: Genre[]): Map<number, string> => {
  return new Map(genres.map(({id, name}) => [id, name]));
}
