import { Component, effect, inject, input } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { VideoItem } from '../videos.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-item-info',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './movie-item-info.component.html',
  styleUrl: './movie-item-info.component.css'
})
export class MovieItemInfoComponent {
  id = input.required<number>();
  private moviesService = inject(MoviesService);
  private sanitizer = inject(DomSanitizer);

  info$: Observable<unknown> | undefined;
  videos$: Observable<VideoItem[]> | undefined;
  reviews$: Observable<unknown> | undefined;

  constructor() {
    effect(() => {
      this.info$ = this.moviesService.details(this.id());
      this.videos$ = this.moviesService.videos(this.id());
      this.reviews$ = this.moviesService.reviews(this.id());
    });
  }

  getSafeResourceUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
