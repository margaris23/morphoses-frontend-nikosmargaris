import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, signal } from '@angular/core';
import { MovieItem } from '../movies.model';
import { MovieItemInfoComponent } from '../item-info/movie-item-info.component';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-movie-item',
  imports: [MovieItemInfoComponent, DatePipe, LucideAngularModule],
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
      if (!this.showInfo()) {
        this.isExpanded.set(false);
      } else {
        this.elementRef.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  }

  toggle(): void {
    this.showInfo.update(state => !state);
  }
}
