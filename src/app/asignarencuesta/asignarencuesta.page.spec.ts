import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarencuestaPage } from './asignarencuesta.page';

describe('AsignarencuestaPage', () => {
  let component: AsignarencuestaPage;
  let fixture: ComponentFixture<AsignarencuestaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsignarencuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
