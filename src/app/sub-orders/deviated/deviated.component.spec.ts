import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviatedComponent } from './deviated.component';

describe('DeviatedComponent', () => {
  let component: DeviatedComponent;
  let fixture: ComponentFixture<DeviatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
