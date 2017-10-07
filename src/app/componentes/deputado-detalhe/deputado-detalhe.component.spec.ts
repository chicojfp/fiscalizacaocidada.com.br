import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputadoDetalheComponent } from './deputado-detalhe.component';

describe('DeputadoDetalheComponent', () => {
  let component: DeputadoDetalheComponent;
  let fixture: ComponentFixture<DeputadoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputadoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputadoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
