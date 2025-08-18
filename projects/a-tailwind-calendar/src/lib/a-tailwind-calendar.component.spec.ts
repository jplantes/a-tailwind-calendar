import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATailwindCalendarComponent } from './a-tailwind-calendar.component';

describe('ATailwindCalendarComponent', () => {
  let component: ATailwindCalendarComponent;
  let fixture: ComponentFixture<ATailwindCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATailwindCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ATailwindCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
