import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblioadminComponent } from './biblioadmin.component';

describe('BiblioadminComponent', () => {
  let component: BiblioadminComponent;
  let fixture: ComponentFixture<BiblioadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiblioadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiblioadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
