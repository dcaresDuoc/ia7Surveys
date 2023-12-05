import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminclientePage } from './admincliente.page';

describe('AdminclientePage', () => {
  let component: AdminclientePage;
  let fixture: ComponentFixture<AdminclientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
