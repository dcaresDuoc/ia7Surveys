import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticadetallePage } from './estadisticadetalle.page';

describe('EstadisticadetallePage', () => {
  let component: EstadisticadetallePage;
  let fixture: ComponentFixture<EstadisticadetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstadisticadetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
