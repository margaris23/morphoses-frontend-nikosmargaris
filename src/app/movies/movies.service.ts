import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movies.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);
  private api_url = "/api";

  nowPlaying(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.api_url}/movie/now_playing?api_key=${env.API_KEY}`);
  }
}
