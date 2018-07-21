import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedsoComponent } from './approvedso.component';

describe('ApprovedsoComponent', () => {
  let component: ApprovedsoComponent;
  let fixture: ComponentFixture<ApprovedsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
