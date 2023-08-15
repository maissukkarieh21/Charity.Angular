import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityComponent } from './charity.component';

describe('CharityComponent', () => {
  let component: CharityComponent;
  let fixture: ComponentFixture<CharityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharityComponent]
    });
    fixture = TestBed.createComponent(CharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
