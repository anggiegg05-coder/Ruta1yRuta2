import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinoDetallePage } from './destino-detalle.page';

describe('DestinoDetallePage', () => {
  let component: DestinoDetallePage;
  let fixture: ComponentFixture<DestinoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
