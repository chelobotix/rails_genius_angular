import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesInRealLifeComponent } from './cookies-in-real-life.component';

describe('CookiesInRealLifeComponent', () => {
  let component: CookiesInRealLifeComponent;
  let fixture: ComponentFixture<CookiesInRealLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesInRealLifeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesInRealLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
