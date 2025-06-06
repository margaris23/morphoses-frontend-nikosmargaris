import { Component, effect, input, signal } from '@angular/core';
import { MovieItem } from '../movies.model';
import { MovieItemInfoComponent } from '../item-info/movie-item-info.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-item',
  imports: [MovieItemInfoComponent, DatePipe],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  movie = input.required<MovieItem>();

  protected showInfo = signal(false);
  protected isExpanded = signal(false);

  constructor() {
    effect(() => {
      if (!this.showInfo()) {
        this.isExpanded.set(false);
      }
    });
  }

  toggle(event: Event): void {
    event.preventDefault();
    this.showInfo.update(state => !state);
  }
}
