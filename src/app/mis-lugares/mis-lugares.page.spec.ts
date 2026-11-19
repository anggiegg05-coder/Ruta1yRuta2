import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisLugaresPage } from './mis-lugares.page';

describe('MisLugaresPage', () => {
  let component: MisLugaresPage;
  let fixture: ComponentFixture<MisLugaresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisLugaresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
