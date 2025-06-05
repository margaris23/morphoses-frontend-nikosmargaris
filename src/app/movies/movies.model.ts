import { Genre, toGenreName } from "./genres.model";

// SERVER
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

export type MovieDetails = Movie & {
  budget: number;
  homepage: string;
  origin_country: string[];
  original_language: string;
  revenue: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}

// CLIENT
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

export type MovieDetailsView = {
  budget: number;
  revenue: number;
  homepage: string;
  origin: { country: string; language: string };
  languages: string;
}

const POSTER_PATH = 'https://media.themoviedb.org/t/p/w94_and_h141_bestv2';
const NO_IMAGE = '/no_image.svg';

export const toMovieItem = (genres: Map<number, string>) => (movie: Movie): MovieItem => {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    poster: movie.poster_path ? `${POSTER_PATH}${movie.poster_path}` : NO_IMAGE,
    releaseDate: movie.release_date,
    overview: movie.overview,
    votes: {
      avg: `${movie.vote_average.toFixed(1)}%`,
      count: movie.vote_count
    },
    genres: movie.genre_ids.map(toGenreName(genres)).join(", ")
  };
}

export const toMovieDetailsView = (details: MovieDetails): MovieDetailsView => {
  const { budget, revenue, homepage } = details;
  return {
    budget,
    revenue,
    homepage,
    origin: { country: details.origin_country?.[0], language: details.original_language },
    languages: details.spoken_languages.map(lang => lang.iso_639_1).join(', ')
  };
}
