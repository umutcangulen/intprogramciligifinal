/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KiraComponent } from './Kira.component';

describe('KiraComponent', () => {
  let component: KiraComponent;
  let fixture: ComponentFixture<KiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
