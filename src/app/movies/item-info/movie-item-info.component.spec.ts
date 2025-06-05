import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieItemInfoComponent } from './movie-item-info.component';

describe('MovieItemInfoComponent', () => {
  let component: MovieItemInfoComponent;
  let fixture: ComponentFixture<MovieItemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieItemInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
