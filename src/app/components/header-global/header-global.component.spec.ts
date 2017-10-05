import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGlobalComponent } from './header-global.component';

describe('HeaderGlobalComponent', () => {
  let component: HeaderGlobalComponent;
  let fixture: ComponentFixture<HeaderGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
