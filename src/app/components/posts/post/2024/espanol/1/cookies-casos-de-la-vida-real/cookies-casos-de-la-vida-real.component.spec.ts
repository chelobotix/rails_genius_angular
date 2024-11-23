import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesCasosDeLaVidaRealComponent } from './cookies-casos-de-la-vida-real.component';

describe('CookiesCasosDeLaVidaRealComponent', () => {
  let component: CookiesCasosDeLaVidaRealComponent;
  let fixture: ComponentFixture<CookiesCasosDeLaVidaRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesCasosDeLaVidaRealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesCasosDeLaVidaRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
