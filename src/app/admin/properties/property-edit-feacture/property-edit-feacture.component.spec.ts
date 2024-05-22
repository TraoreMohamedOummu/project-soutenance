import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEditFeactureComponent } from './property-edit-feacture.component';

describe('PropertyEditFeactureComponent', () => {
  let component: PropertyEditFeactureComponent;
  let fixture: ComponentFixture<PropertyEditFeactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyEditFeactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyEditFeactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
