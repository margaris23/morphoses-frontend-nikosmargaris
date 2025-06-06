import { Component, effect, inject, input } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { VideoItem } from '../videos.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Review } from '../reviews.model';
import { MovieDetailsView, SlimMovieItem } from '../movies.model';

@Component({
  selector: 'app-movie-item-info',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './movie-item-info.component.html',
  styleUrl: './movie-item-info.component.css'
})
export class MovieItemInfoComponent {
  id = input.required<number>();
  private moviesService = inject(MoviesService);
  private sanitizer = inject(DomSanitizer);

  details$: Observable<MovieDetailsView> | undefined;
  videos$: Observable<VideoItem[]> | undefined;
  reviews$: Observable<Review[]> | undefined;
  similar$: Observable<SlimMovieItem[]> | undefined;

  constructor() {
    effect(() => {
      this.details$ = this.moviesService.details(this.id());
      this.videos$ = this.moviesService.videos(this.id());
      this.reviews$ = this.moviesService.reviews(this.id());
      this.similar$ = this.moviesService.similar(this.id());
    });
  }

  getSafeResourceUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
