import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusadminComponent } from './editusadmin.component';

describe('EditusadminComponent', () => {
  let component: EditusadminComponent;
  let fixture: ComponentFixture<EditusadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditusadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditusadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
