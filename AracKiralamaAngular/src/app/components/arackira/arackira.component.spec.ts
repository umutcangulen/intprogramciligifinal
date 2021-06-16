/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArackiraComponent } from './arackira.component';

describe('ArackiraComponent', () => {
  let component: ArackiraComponent;
  let fixture: ComponentFixture<ArackiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArackiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArackiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
