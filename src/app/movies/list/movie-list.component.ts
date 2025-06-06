import { Component, ElementRef, inject, afterNextRender, OnDestroy } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AsyncPipe } from '@angular/common';
import { MovieItemComponent } from '../item/movie-item.component';
import { tap } from 'rxjs';

const OBSERVER_CONFIG = {
  rootMargin: "0%",
  threshold: 1.0
};

@Component({
  selector: 'app-movie-list',
  imports: [AsyncPipe, MovieItemComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnDestroy {
  private moviesService = inject(MoviesService);
  private observer!: IntersectionObserver;
  private elementRef = inject(ElementRef);

  protected movies$ = this.moviesService.movies().pipe(
    tap(results => {
      if (results.length <= 20) {
        setTimeout(() => {
          this.elementRef.nativeElement.scrollTo?.({ top: 0, behavior: 'smooth' });
        });
      }
    })
  );

  constructor() {
    afterNextRender(() => {
      const root = this.elementRef.nativeElement;

      this.observer = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          if (entry.isIntersecting) {
            this.moviesService.loadMore();
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
