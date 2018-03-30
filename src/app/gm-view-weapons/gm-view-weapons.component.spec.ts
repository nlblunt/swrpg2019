import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmViewWeaponsComponent } from './gm-view-weapons.component';

describe('GmViewWeaponsComponent', () => {
  let component: GmViewWeaponsComponent;
  let fixture: ComponentFixture<GmViewWeaponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmViewWeaponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmViewWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
