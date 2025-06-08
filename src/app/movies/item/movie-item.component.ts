import {
  ChangeDetectionStrategy, Component, effect,
  ElementRef, inject, input, signal
} from '@angular/core';
import { MovieItem } from '../movies.model';
import { MovieItemInfoComponent } from '../item-info/movie-item-info.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-movie-item',
  imports: [MovieItemInfoComponent, DatePipe, LucideAngularModule, NgOptimizedImage],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent {
  movie = input.required<MovieItem>();

  Star = Star;

  protected showInfo = signal(false);
  protected isExpanded = signal(false);

  private elementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      if (this.showInfo()) {
        this.elementRef.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      } else {
        this.isExpanded.set(false);
      }
    });
  }

  toggle(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof KeyboardEvent) {
      if (event.key !== " " && event.key !== "Enter") {
        return;
      }
      event.preventDefault();
    }
    this.showInfo.update(state => !state);
  }
}
