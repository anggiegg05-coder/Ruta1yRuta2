import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { DestinosService } from './destinos';

describe('DestinosService', () => {
  let service: DestinosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(DestinosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});