import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, BehaviorSubject, combineLatest, scan, distinctUntilChanged, shareReplay } from 'rxjs';
import { Genre, Movie, MovieItem, toGenreMap, toMovieItem } from './movies.model';
import { environment as env } from '../../environments/environment';
import { APIListResult } from '../api.model';

const API = {
  NOW_PLAYING: '/api/movie/now_playing',
  SEARCH: '/api/search/movie',
  GENRES: '/api/genre/movie/list'
};

const FIRST_PAGE = 1;

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private http = inject(HttpClient);
  private query$ = new BehaviorSubject<string>("");
  private page$ = new BehaviorSubject<number>(FIRST_PAGE);
  private genres$ = this.fetchGenres().pipe(
    shareReplay(1),
    map(res => res.genres)
  );

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
            query
          })))
      ),
      // accumulate results if page changed
      scan((acc, res) => {
        if (res.page > acc.page) {
          return {
            results: [...acc.results, ...res.results],
            page: res.page,
            query: res.query
          };
        }
        return res;
      }),
      map(res => res.results)
    );
  }

  search(query: string): void {
    this.query$.next(query);
  }

  loadMore(): void {
    this.page$.next(this.page$.value + 1);
  }

  private fetchMovies(query: string, page: number): Observable<APIListResult<Movie>> {
    const params = new URLSearchParams();
    params.set("api_key", env.API_KEY);
    params.set("query", query);
    params.set("page", page.toString());

    const endp = `${query ? API.SEARCH : API.NOW_PLAYING}?${params}`;

    return this.http.get<APIListResult<Movie>>(endp);
  }

  private fetchGenres(): Observable<Record<"genres", Genre[]>> {
    const params = new URLSearchParams();
    params.set("api_key", env.API_KEY);

    const endp = `${API.GENRES}?${params}`;

    return this.http.get<Record<"genres", Genre[]>>(endp);
  }
}
