import { TestBed } from '@angular/core/testing';
import { RecomendacionesService } from './recomendaciones';

describe('Recomendaciones', () => {
  let service: RecomendacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
