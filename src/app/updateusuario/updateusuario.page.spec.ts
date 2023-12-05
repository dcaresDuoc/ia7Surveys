import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateusuarioPage } from './updateusuario.page';

describe('UpdateusuarioPage', () => {
  let component: UpdateusuarioPage;
  let fixture: ComponentFixture<UpdateusuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
