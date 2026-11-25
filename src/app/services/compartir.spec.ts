import { TestBed } from '@angular/core/testing';
import { CompartirService } from './compartir';

describe('Compartir', () => {
  let service: CompartirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
