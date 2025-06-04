import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Movie, MovieItem, toMovieItem } from './movies.model';
import { environment as env } from '../../environments/environment';
import { APIListResult } from '../api.model';
import { toObservable } from '@angular/core/rxjs-interop';

const API = {
  NOW_PLAYING: '/api/movie/now_playing',
};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);

  private _query = signal("");
  private query$ = toObservable(this._query);

  nowPlaying(): Observable<MovieItem[]> {
    return this.query$.pipe(
      switchMap(query => {
        const endp = `${API.NOW_PLAYING}?api_key=${env.API_KEY}`;
        return this.http.get<APIListResult<Movie>>(endp);
      }),
      map(res => res.results.map(toMovieItem))
    );
  }

  search(query: string): void {
    this._query.set(query);
  }
}
