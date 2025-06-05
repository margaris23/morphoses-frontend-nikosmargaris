import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, BehaviorSubject, combineLatest, scan, distinctUntilChanged } from 'rxjs';
import { Movie, MovieItem, toMovieItem } from './movies.model';
import { environment as env } from '../../environments/environment';
import { APIListResult } from '../api.model';

const API = {
  NOW_PLAYING: '/api/movie/now_playing',
  SEARCH: '/api/search/movie',
};

const FIRST_PAGE = 1;

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private http = inject(HttpClient);
  private query$ = new BehaviorSubject<string>("");
  private page$ = new BehaviorSubject<number>(FIRST_PAGE);

  movies(): Observable<MovieItem[]> {
    return combineLatest([this.query$, this.page$]).pipe(
      // check if filtering changed
      distinctUntilChanged((prev, current) => {
        const [prevQuery, prevPage] = prev;
        const [currQuery, currPage] = current;
        return prevQuery === currQuery && prevPage === currPage;
      }),
      // reset page if query changed
      scan((acc, current) => {
        const [prevQuery] = acc;
        const [currQuery] = current;
        return prevQuery === currQuery
          ? current
          : [currQuery, FIRST_PAGE] satisfies [string, number];
      }),
      // consume http API
      switchMap(([query, page]) =>
        this.fetchMovies(query, page).pipe(
          map(reply => ({
            results: reply.results.map(toMovieItem),
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
}
