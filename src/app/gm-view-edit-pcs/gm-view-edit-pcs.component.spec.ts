import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmViewEditPcsComponent } from './gm-view-edit-pcs.component';

describe('GmViewEditPcsComponent', () => {
  let component: GmViewEditPcsComponent;
  let fixture: ComponentFixture<GmViewEditPcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmViewEditPcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmViewEditPcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
