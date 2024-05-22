import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePropertyEditComponent } from './type-property-edit.component';

describe('TypePropertyEditComponent', () => {
  let component: TypePropertyEditComponent;
  let fixture: ComponentFixture<TypePropertyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypePropertyEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypePropertyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
