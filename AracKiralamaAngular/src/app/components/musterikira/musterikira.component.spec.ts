/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusterikiraComponent } from './musterikira.component';

describe('MusterikiraComponent', () => {
  let component: MusterikiraComponent;
  let fixture: ComponentFixture<MusterikiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusterikiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusterikiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
