import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MoviesService } from './movies/movies.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let moviesSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesSpy = jasmine.createSpyObj('MoviesService', ['movies']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{provide: MoviesService, useValue: moviesSpy }]
    }).compileComponents();

    moviesSpy.movies.and.returnValue(of([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'morphoses-frontend-nikosmargaris' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('morphoses-frontend-nikosmargaris');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Movies');
  });
});
