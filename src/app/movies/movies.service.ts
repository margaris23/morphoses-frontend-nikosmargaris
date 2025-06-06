import { inject, Injectable } from '@angular/core';
import {
  map, Observable, switchMap, BehaviorSubject, combineLatest,
  scan, distinctUntilChanged, shareReplay
} from 'rxjs';
import {
  byMoviePosterPath, Movie, MovieDetails, MovieDetailsView, MovieItem,
  SlimMovieItem, toMovieDetailsView, toMovieItem, toSlimMovieItem
} from './movies.model';
import { APIListResult } from '../api.model';
import { APIService } from '../api.service';
import { byVideoTrailer, toVideoItem, Video, VideoItem } from './videos.model';
import { Genre, toGenreMap } from './genres.model';
import { Review } from './reviews.model';

const API = {
  NOW_PLAYING: '/api/movie/now_playing',
  SEARCH: '/api/search/movie',
  GENRES: '/api/genre/movie/list',
  MOVIE_DETAILS: (id: number) => `/api/movie/${id}`,
  MOVIE_VIDEOS: (id: number) => `/api/movie/${id}/videos`,
  MOVIE_SIMILAR: (id: number) => `/api/movie/${id}/similar`,
  MOVIE_REVIEWS: (id: number) => `/api/movie/${id}/reviews`,
};

const FIRST_PAGE = 1;

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private apiService = inject(APIService);
  private query$ = new BehaviorSubject<string>("");
  private page$ = new BehaviorSubject<number>(FIRST_PAGE);
  private genres$ = this.fetchGenres().pipe(
    shareReplay(1),
    map(res => res.genres)
  );

  readonly DEFAULT_PAGE_SIZE = 20;

  movies(): Observable<MovieItem[]> {
    return combineLatest([this.query$, this.page$, this.genres$]).pipe(
      // check if filtering changed
      distinctUntilChanged((prev, current) => {
        const [prevQuery, prevPage] = prev;
        const [currQuery, currPage] = current;
        return prevQuery === currQuery && prevPage === currPage;
      }),
      // reset page if query changed
      scan((acc, current) => {
        const [prevQuery] = acc;
        const [currQuery, _, genres] = current;
        return prevQuery === currQuery
          ? current
          : [currQuery, FIRST_PAGE, genres] satisfies [string, number, Genre[]];
      }),
      // consume http API
      switchMap(([query, page, genres]) =>
        this.fetchMovies(query, page).pipe(
          map(reply => ({
            results: reply.results.map(toMovieItem(toGenreMap(genres))),
            page: reply.page,
          })))
      ),
      // accumulate results if page changed
      scan((acc, res) => {
        if (res.page > acc.page) {
          return {
            results: [...acc.results, ...res.results],
            page: res.page,
          };
        }
        return res;
      }),
      map(res => res.results)
    );
  }

  details(id: number): Observable<MovieDetailsView> {
    return this.apiService.fetch<MovieDetails>(API.MOVIE_DETAILS(id)).pipe(
      map(toMovieDetailsView)
    );
  }

  videos(id: number): Observable<VideoItem[]> {
    return this.apiService.fetch<{ results: Video[] }>(API.MOVIE_VIDEOS(id)).pipe(
      map(res => res.results
        .filter(byVideoTrailer)
        .slice(1, 2)
        .map(toVideoItem))
    );
  }

  similar(id: number): Observable<SlimMovieItem[]> {
    return this.apiService.fetch<APIListResult<Movie>>(API.MOVIE_SIMILAR(id)).pipe(
      map(res => res.results
        .filter(byMoviePosterPath)
        .map(toSlimMovieItem))
    );
  }

  reviews(id: number): Observable<Review[]> {
    return this.apiService.fetch<APIListResult<Review>>(API.MOVIE_REVIEWS(id)).pipe(
      map(res => res.results.slice(1, 3))
    );
  }

  search(query: string): void {
    this.query$.next(query);
  }

  loadMore(): void {
    this.page$.next(this.page$.value + 1);
  }

  private fetchMovies(query: string, page: number): Observable<APIListResult<Movie>> {
    const url = query ? API.SEARCH : API.NOW_PLAYING;
    const params = { query, page: page.toString() };

    return this.apiService.fetch<APIListResult<Movie>>(url, params);
  }

  private fetchGenres(): Observable<Record<"genres", Genre[]>> {
    return this.apiService.fetch<Record<"genres", Genre[]>>(API.GENRES);
  }
}
