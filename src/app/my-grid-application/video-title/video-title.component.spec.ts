import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTitleComponent } from './video-title.component';

describe('RedComponentComponent', () => {
  let component: VideoTitleComponent;
  let fixture: ComponentFixture<VideoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoTitleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
