import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieItemComponent } from './movie-item.component';
import { MovieItem } from '../movies.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const movieInput: MovieItem = {
  id: 1,
  title: 'title',
  originalTitle: 'originalTitle',
  genres: ['genre1', 'genre2'],
  poster: 'poster',
  releaseDate: '2025-05-22',
  votes: { avg: '10.0', count: 23 },
  overview: 'overview'
};

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;
  let compElement: HTMLElement;
  let compDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieItemComponent);
    fixture.componentRef.setInput('movie', movieInput);

    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    compDebug = fixture.debugElement.query(By.css('article'));
    compElement = compDebug.nativeElement;

    await fixture.whenStable();
  });

  it('should display movie info', () => {
    const expectedMovieInfo = 'title(originalTitle)Released: May 22, 2025';
    const expectedScore = '10.0 (23 votes)'
    expect(compElement.textContent).toContain(expectedMovieInfo);
    expect(compElement.textContent).toContain(expectedScore);

    const poster = compElement.querySelector('img')!;
    const expectedPoster = 'http://localhost:9876/poster';
    expect(poster.src).toEqual(expectedPoster);
  });
});
