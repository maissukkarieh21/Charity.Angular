import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactuserComponent } from './contactuser.component';

describe('ContactuserComponent', () => {
  let component: ContactuserComponent;
  let fixture: ComponentFixture<ContactuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactuserComponent]
    });
    fixture = TestBed.createComponent(ContactuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
