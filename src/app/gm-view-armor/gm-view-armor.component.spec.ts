import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmViewArmorComponent } from './gm-view-armor.component';

describe('GmViewArmorComponent', () => {
  let component: GmViewArmorComponent;
  let fixture: ComponentFixture<GmViewArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmViewArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmViewArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
