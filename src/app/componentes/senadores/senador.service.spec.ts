import { TestBed, inject } from '@angular/core/testing';

import { SenadorService } from './senador.service';

describe('SenadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SenadorService]
    });
  });

  it('should be created', inject([SenadorService], (service: SenadorService) => {
    expect(service).toBeTruthy();
  }));
});
