import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostviewednewsComponent } from './mostviewednews.component';

describe('MostviewednewsComponent', () => {
  let component: MostviewednewsComponent;
  let fixture: ComponentFixture<MostviewednewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostviewednewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostviewednewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
