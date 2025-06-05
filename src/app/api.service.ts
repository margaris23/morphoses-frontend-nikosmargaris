import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private http = inject(HttpClient);

  fetch<T>(url: string, query?: Record<string, string>): Observable<T> {
    const params = new URLSearchParams(query);
    params.set("api_key", env.API_KEY);

    return this.http.get<T>(`${url}?${params}`);
  }
}
