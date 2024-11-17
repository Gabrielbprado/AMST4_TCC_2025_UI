import { TestBed } from '@angular/core/testing';

import { CategoryCommunicationService } from './category-communication.service';

describe('CategoryCommunicationService', () => {
  let service: CategoryCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
