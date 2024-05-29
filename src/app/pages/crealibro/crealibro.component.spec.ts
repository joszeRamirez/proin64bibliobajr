import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrealibroComponent } from './crealibro.component';

describe('CrealibroComponent', () => {
  let component: CrealibroComponent;
  let fixture: ComponentFixture<CrealibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrealibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrealibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
