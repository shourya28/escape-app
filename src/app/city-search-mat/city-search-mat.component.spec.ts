import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchMatComponent } from './city-search-mat.component';

describe('CitySearchMatComponent', () => {
  let component: CitySearchMatComponent;
  let fixture: ComponentFixture<CitySearchMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitySearchMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySearchMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
