import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcDashComponent } from './cc-dash.component';

describe('CcDashComponent', () => {
  let component: CcDashComponent;
  let fixture: ComponentFixture<CcDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
