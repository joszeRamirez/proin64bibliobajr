import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListausuarioComponent } from './listausuario.component';

describe('ListausuarioComponent', () => {
  let component: ListausuarioComponent;
  let fixture: ComponentFixture<ListausuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListausuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
