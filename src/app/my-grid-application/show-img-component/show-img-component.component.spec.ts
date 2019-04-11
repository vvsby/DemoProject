import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImgComponentComponent } from './show-img-component.component';

describe('ShowImgComponentComponent', () => {
  let component: ShowImgComponentComponent;
  let fixture: ComponentFixture<ShowImgComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImgComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImgComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
