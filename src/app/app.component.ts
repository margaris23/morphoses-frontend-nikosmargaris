import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './movies/list/movie-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly title = 'morphoses-frontend-nikosmargaris';
}
