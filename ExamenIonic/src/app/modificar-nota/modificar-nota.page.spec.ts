import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarNotaPage } from './modificar-nota.page';

describe('ModificarNotaPage', () => {
  let component: ModificarNotaPage;
  let fixture: ComponentFixture<ModificarNotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
