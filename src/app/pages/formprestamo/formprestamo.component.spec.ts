import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormprestamoComponent } from './formprestamo.component';

describe('FormprestamoComponent', () => {
  let component: FormprestamoComponent;
  let fixture: ComponentFixture<FormprestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormprestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
