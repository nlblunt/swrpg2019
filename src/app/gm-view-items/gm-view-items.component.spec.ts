import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmViewItemsComponent } from './gm-view-items.component';

describe('GmViewItemsComponent', () => {
  let component: GmViewItemsComponent;
  let fixture: ComponentFixture<GmViewItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmViewItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmViewItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
