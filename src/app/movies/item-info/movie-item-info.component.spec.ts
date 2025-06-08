import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieItemInfoComponent } from './movie-item-info.component';
import { MoviesService } from '../movies.service';
import { of } from 'rxjs';
import { MovieDetailsView, SlimMovieItem } from '../movies.model';
import { VideoItem } from '../videos.model';
import { Review } from '../reviews.model';

const MOVIE_ID = 1234;
const mockDetails: MovieDetailsView = {
  budget: 10000,
  revenue: 15000,
  homepage: 'https://movie.com',
  origin: { country: 'GR', language: 'gr' },
  languages: 'gr'
};
const mockVideos: VideoItem[] = [];
const mockReviews: Review[] = [];
const mockSimilar: SlimMovieItem[] = [];

describe('MovieItemInfoComponent', () => {
  let component: MovieItemInfoComponent;
  let fixture: ComponentFixture<MovieItemInfoComponent>;
  let moviesSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesSpy = jasmine.createSpyObj('MoviesService',
      ['details', 'videos', 'similar', 'reviews']);

    await TestBed.configureTestingModule({
      imports: [MovieItemInfoComponent],
      providers: [{ provide: MoviesService, useValue: moviesSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieItemInfoComponent);
    fixture.componentRef.setInput('id', MOVIE_ID);

    moviesSpy.details.and.returnValue(of(mockDetails));
    moviesSpy.videos.and.returnValue(of(mockVideos));
    moviesSpy.reviews.and.returnValue(of(mockReviews));
    moviesSpy.similar.and.returnValue(of(mockSimilar));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
