import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyShootOutComponent } from './penalty-shoot-out.component';

describe('PenaltyShootOutComponent', () => {
  let component: PenaltyShootOutComponent;
  let fixture: ComponentFixture<PenaltyShootOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyShootOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyShootOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
