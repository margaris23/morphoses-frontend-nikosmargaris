import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './movies/list/movie-list.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieListComponent, MovieSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly title = 'morphoses-frontend-nikosmargaris';
}
