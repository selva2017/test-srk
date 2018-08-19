import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonBusinessCustomersComponent } from './non-business-customers.component';

describe('NonBusinessCustomersComponent', () => {
  let component: NonBusinessCustomersComponent;
  let fixture: ComponentFixture<NonBusinessCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonBusinessCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBusinessCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
