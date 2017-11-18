import { TestBed, inject } from '@angular/core/testing';

import { DeputadosService } from './deputados.service';

describe('DeputadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeputadosService]
    });
  });

  it('should be created', inject([DeputadosService], (service: DeputadosService) => {
    expect(service).toBeTruthy();
  }));
});
