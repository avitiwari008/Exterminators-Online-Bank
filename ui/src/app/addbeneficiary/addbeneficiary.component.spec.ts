import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbeneficiaryComponent } from './addbeneficiary.component';

describe('AddbeneficiaryComponent', () => {
  let component: AddbeneficiaryComponent;
  let fixture: ComponentFixture<AddbeneficiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbeneficiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
