import { Component, inject } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [AsyncPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  private movieService = inject(MoviesService);
  protected movies$ = this.movieService.nowPlaying();
}
