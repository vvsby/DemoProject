import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateParseComponent } from './date-parse.component';

describe('DateParseComponent', () => {
  let component: DateParseComponent;
  let fixture: ComponentFixture<DateParseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateParseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateParseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
