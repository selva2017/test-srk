import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcRequestsComponent } from './pc-requests.component';

describe('PcRequestsComponent', () => {
  let component: PcRequestsComponent;
  let fixture: ComponentFixture<PcRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
