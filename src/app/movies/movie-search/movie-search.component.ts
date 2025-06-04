import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MoviesService } from '../movies.service';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

const DEBOUNCE_TIME = 400;
const SEARCH_TEXT_MIN_SIZE = 3;

@Component({
  selector: 'app-movie-search',
  imports: [],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent implements OnDestroy {
  protected searchInput = signal("");

  private textSubject$ = toObservable(this.searchInput);
  private destroy$ = new Subject<void>();
  private moviesService = inject(MoviesService);

  protected search(event: Event): void {
    event.preventDefault();
    this.searchInput.set((event.target as HTMLInputElement).value);
  }

  protected reset(): void {
    this.searchInput.set("");
  }

  constructor() {
    this.textSubject$
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        map(query => query.trim()),
        distinctUntilChanged(),
        filter(query => query.length >= SEARCH_TEXT_MIN_SIZE || !query.length),
        takeUntil(this.destroy$),
      )
      .subscribe(query => this.moviesService.search(query));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
