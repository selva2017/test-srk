import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReEstimatedComponent } from './re-estimated.component';

describe('ReEstimatedComponent', () => {
  let component: ReEstimatedComponent;
  let fixture: ComponentFixture<ReEstimatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReEstimatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReEstimatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
