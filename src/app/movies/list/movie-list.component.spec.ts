import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { MoviesService } from '../movies.service';
import { of } from 'rxjs';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let moviesSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesSpy = jasmine.createSpyObj('MoviesService', ['movies']);

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [{provide: MoviesService, useValue: moviesSpy }]
    })
    .compileComponents();

    moviesSpy.movies.and.returnValue(of([]));

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
