import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgAddItemComponent } from './dlg-add-item.component';

describe('DlgAddItemComponent', () => {
  let component: DlgAddItemComponent;
  let fixture: ComponentFixture<DlgAddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgAddItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
