import { TestBed } from '@angular/core/testing';

import { ApiControllerService } from './api-controller.service';

describe('ApiControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiControllerService = TestBed.get(ApiControllerService);
    expect(service).toBeTruthy();
  });
});
