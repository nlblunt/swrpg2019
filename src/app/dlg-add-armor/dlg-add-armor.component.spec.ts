import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgAddArmorComponent } from './dlg-add-armor.component';

describe('DlgAddArmorComponent', () => {
  let component: DlgAddArmorComponent;
  let fixture: ComponentFixture<DlgAddArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgAddArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgAddArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
