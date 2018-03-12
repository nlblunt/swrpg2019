import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcSelectComponent } from './pc-select.component';

describe('PcSelectComponent', () => {
  let component: PcSelectComponent;
  let fixture: ComponentFixture<PcSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
