import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminusuariosPage } from './adminusuarios.page';

describe('AdminusuariosPage', () => {
  let component: AdminusuariosPage;
  let fixture: ComponentFixture<AdminusuariosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
