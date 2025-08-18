import { TestBed } from '@angular/core/testing';

import { ATailwindCalendarService } from './a-tailwind-calendar.service';

describe('ATailwindCalendarService', () => {
  let service: ATailwindCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATailwindCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
