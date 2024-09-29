import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarNotasPage } from './agregar-notas.page';

describe('AgregarNotasPage', () => {
  let component: AgregarNotasPage;
  let fixture: ComponentFixture<AgregarNotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
