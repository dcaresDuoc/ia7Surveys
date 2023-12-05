import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneraencuestaPage } from './generaencuesta.page';

describe('GeneraencuestaPage', () => {
  let component: GeneraencuestaPage;
  let fixture: ComponentFixture<GeneraencuestaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneraencuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
