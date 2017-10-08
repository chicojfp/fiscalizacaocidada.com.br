import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoResumoComponent } from './deputado-resumo.component';

describe('DeputadoResumoComponent', () => {
  let component: DeputadoResumoComponent;
  let fixture: ComponentFixture<DeputadoResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputadoResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputadoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
