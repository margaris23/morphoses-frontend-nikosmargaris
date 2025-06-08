import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { APIService } from '../api.service';
import { Observable, of } from 'rxjs';
import { Genre } from './genres.model';
import { APIListResult } from '../api.model';
import { Movie, MovieItem } from './movies.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let apiSpy: jasmine.SpyObj<APIService>;

  const mockGenres: { genres: Genre[] } = {
    genres: [{ id: 3, name: 'Drama' }, { id: 5, name: 'Comedy' }]
  };

  const mockMovies: APIListResult<Movie> = {
    results: [
      {
        id: 1234,
        title: 'title',
        original_title: 'originalTitle',
        poster_path: '/poster',
        release_date: '2025-02-25',
        overview: 'overview',
        vote_average: 6.1,
        vote_count: 23,
        genre_ids: [3, 5]
      }
    ],
    page: 1,
    total_pages: 2,
    total_results: 56
  };

  const mockAPI = (url: string, query?: Record<string, string>): Observable<any> => {
    switch (url) {
      case '/api/genre/movie/list':
        return of(mockGenres);
      case '/api/movie/now_playing':
        return of(mockMovies);
    }

    return of();
  }

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj('APIService', ['fetch']);
    apiSpy.fetch.and.callFake(mockAPI);

    TestBed.configureTestingModule({
      providers: [{ provide: APIService, useValue: apiSpy }]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should reply with movies', (done) => {
    const expectedMovies: MovieItem[] = [{
      id: 1234,
      title: 'title',
      originalTitle: 'originalTitle',
      poster: 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/poster',
      releaseDate: '2025-02-25',
      overview: 'overview',
      votes: { avg: '6.1%', count: 23 },
      genres: ['Drama', 'Comedy']
    }];
    service.movies().subscribe(res => {
      expect(res).toEqual(expectedMovies);
      done();
    });
  });

  // Those tests are left empty to catch up with deadline
  // however they should be implemented as being part of
  // Definition of Done
  it('should reply and concatenate with more movie results', () => {
    // TODO: should be implemented - Basic Scenario
  });
  it('should reply with movie details results', () => {
    // TODO: should be implemented - Basic Scenario
  });
  it('should reply with movie videos results', () => {
    // TODO: should be implemented - Basic Scenario
  });
  it('should reply with movie reviews results', () => {
    // TODO: should be implemented - Basic Scenario
  });
  it('should reply with movie similar results', () => {
    // TODO: should be implemented - Basic Scenario
  });
});
