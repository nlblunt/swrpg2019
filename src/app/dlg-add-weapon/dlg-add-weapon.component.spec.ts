import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgAddWeaponComponent } from './dlg-add-weapon.component';

describe('DlgAddWeaponComponent', () => {
  let component: DlgAddWeaponComponent;
  let fixture: ComponentFixture<DlgAddWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgAddWeaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgAddWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
