import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomeComponent } from './rome.component';

describe('RomeComponent', () => {
  let component: RomeComponent;
  let fixture: ComponentFixture<RomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
