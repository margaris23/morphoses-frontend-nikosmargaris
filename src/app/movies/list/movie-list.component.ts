import { Component, ElementRef, inject, afterNextRender, OnDestroy } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AsyncPipe } from '@angular/common';

const OBSERVER_CONFIG = {
  rootMargin: "0%",
  threshold: 1.0
};

@Component({
  selector: 'app-movie-list',
  imports: [AsyncPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnDestroy {
  private movieService = inject(MoviesService);
  private observer!: IntersectionObserver;

  protected movies$ = this.movieService.movies();

  constructor() {
    const elementRef = inject(ElementRef);

    afterNextRender(() => {
      const root = elementRef.nativeElement;

      this.observer = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          if (entry.isIntersecting) {
            this.movieService.loadMore();
          }
        },
        { root, ...OBSERVER_CONFIG }
      );

      this.observer.observe(root.querySelector("#loading"));
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
