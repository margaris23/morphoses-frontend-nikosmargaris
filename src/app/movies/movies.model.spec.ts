import { GenreMap } from './genres.model';
import { byMoviePosterPath, Movie, MovieDetails, MovieDetailsView, MovieItem, SlimMovieItem, toMovieDetailsView, toMovieItem, toSlimMovieItem } from './movies.model';

describe('Movies Model', () => {
  const movie: Movie = {
    id: 1234,
    title: 'title',
    original_title: 'originalTitle',
    poster_path: '/poster',
    release_date: '2025-02-25',
    overview: 'overview',
    vote_average: 6.1,
    vote_count: 23,
    genre_ids: [1, 2]
  };

  const genres: GenreMap = new Map<number, string>();
  genres.set(1, 'Action');
  genres.set(2, 'Horror');

  it('should convert to MovieItem', () => {
    const expectedMovieItem: MovieItem = {
      id: 1234,
      title: 'title',
      originalTitle: 'originalTitle',
      poster: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/poster',
      releaseDate: '2025-02-25',
      overview: 'overview',
      votes: { avg: '6.1%', count: 23 },
      genres: ['Action', 'Horror']
    };
    expect(toMovieItem(genres)(movie)).toEqual(expectedMovieItem);
  });

  it('should convert to SlimMovieItem', () => {
    const expectedSlimMovieItem: SlimMovieItem = {
      id: 1234,
      title: 'title',
      poster: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/poster',
    };
    expect(toSlimMovieItem(movie)).toEqual(expectedSlimMovieItem);
  });

  it('should convert to MovieDetailsView', () => {
    const movieDetails: MovieDetails = {
      ...movie,
      budget: 1000,
      revenue: 1200,
      homepage: 'www.home.page',
      origin_country: ['GR'],
      original_language: 'gr',
      spoken_languages: [{ iso_639_1: 'gr' }, { iso_639_1: 'en' }]
    };
    const expectedMoveDetailsView: MovieDetailsView = {
      budget: 1000,
      revenue: 1200,
      homepage: 'www.home.page',
      origin: { country: 'GR', language: 'gr' },
      languages: 'gr, en'
    };
    expect(toMovieDetailsView(movieDetails)).toEqual(expectedMoveDetailsView);
  });

  it('should filter by valid posterpath', () => {
    expect(byMoviePosterPath({poster_path: ''})).toBeFalsy();
    expect(byMoviePosterPath({poster_path: '/poster'})).toBeTruthy();
  });
});
