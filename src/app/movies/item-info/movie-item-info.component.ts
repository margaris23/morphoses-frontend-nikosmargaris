import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { VideoItem } from '../videos.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Review } from '../reviews.model';
import { MovieDetailsView, SlimMovieItem } from '../movies.model';
import { TruncatePipe } from '../../truncate.pipe';

const inc = (x: number) => x + 1;
const MINIMUM_NUMBER_OF_FINISHED_REQUESTS = 3;

@Component({
  selector: 'app-movie-item-info',
  imports: [AsyncPipe, CurrencyPipe, TruncatePipe ],
  templateUrl: './movie-item-info.component.html',
  styleUrl: './movie-item-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemInfoComponent {
  id = input.required<number>();
  contentReady = output<void>();

  private moviesService = inject(MoviesService);
  private sanitizer = inject(DomSanitizer);
  private counter = signal<number>(0);

  details$: Observable<MovieDetailsView> | undefined;
  videos$: Observable<VideoItem[]> | undefined;
  reviews$: Observable<Review[]> | undefined;
  similar$: Observable<SlimMovieItem[]> | undefined;

  constructor() {
    effect(() => {
      this.details$ = this.moviesService.details(this.id())
        .pipe(tap(() => this.counter.update(inc)));
      this.videos$ = this.moviesService.videos(this.id())
        .pipe(tap(() => this.counter.update(inc)));
      this.reviews$ = this.moviesService.reviews(this.id())
        .pipe(tap(() => this.counter.update(inc)));
      this.similar$ = this.moviesService.similar(this.id())
        .pipe(tap(() => this.counter.update(inc)));
    });

    effect(() => {
      if (this.counter() > MINIMUM_NUMBER_OF_FINISHED_REQUESTS) {
        this.contentReady.emit();
      }
    });
  }

  getSafeResourceUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
