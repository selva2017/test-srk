import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedOrdersComponent } from './rejected-orders.component';

describe('RejectedOrdersComponent', () => {
  let component: RejectedOrdersComponent;
  let fixture: ComponentFixture<RejectedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
