import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenadoresComponent } from './senadores.component';

describe('SenadoresComponent', () => {
  let component: SenadoresComponent;
  let fixture: ComponentFixture<SenadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
