import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCovidComponent } from './donate-covid.component';

describe('DonateCovidComponent', () => {
  let component: DonateCovidComponent;
  let fixture: ComponentFixture<DonateCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
