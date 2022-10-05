import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeLiveStreamComponent } from './youtube-live-stream.component';

describe('YoutubeLiveStreamComponent', () => {
  let component: YoutubeLiveStreamComponent;
  let fixture: ComponentFixture<YoutubeLiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeLiveStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeLiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
