import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassowrdComponent } from './forgot-passowrd.component';

describe('ForgotPassowrdComponent', () => {
  let component: ForgotPassowrdComponent;
  let fixture: ComponentFixture<ForgotPassowrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassowrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
