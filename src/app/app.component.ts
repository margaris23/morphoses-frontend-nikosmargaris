import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './movies/movies.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly title = 'morphoses-frontend-nikosmargaris';
  private movieService = inject(MoviesService);

  constructor() {
    effect(() => {
      this.movieService.nowPlaying().subscribe(console.log)
    });
  }
}
