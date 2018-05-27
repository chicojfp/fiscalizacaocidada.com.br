import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelenciaResumoComponent } from './excelencia-resumo.component';

describe('ExcelenciaResumoComponent', () => {
  let component: ExcelenciaResumoComponent;
  let fixture: ComponentFixture<ExcelenciaResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelenciaResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelenciaResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
