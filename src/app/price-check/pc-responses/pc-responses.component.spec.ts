import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcResponsesComponent } from './pc-responses.component';

describe('PcResponsesComponent', () => {
  let component: PcResponsesComponent;
  let fixture: ComponentFixture<PcResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
