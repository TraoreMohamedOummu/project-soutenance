import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTerrainPropertyComponent } from './edit-terrain-property.component';

describe('EditTerrainPropertyComponent', () => {
  let component: EditTerrainPropertyComponent;
  let fixture: ComponentFixture<EditTerrainPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTerrainPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTerrainPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
