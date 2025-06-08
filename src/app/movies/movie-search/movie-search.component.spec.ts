import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchComponent } from './movie-search.component';
import { MoviesService } from '../movies.service';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let moviesSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesSpy = jasmine.createSpyObj('MoviesService', ['movies']);

    await TestBed.configureTestingModule({
      imports: [MovieSearchComponent],
      providers: [{provide: MoviesService, useValue: moviesSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
