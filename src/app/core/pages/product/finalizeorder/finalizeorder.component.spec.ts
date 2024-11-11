import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeorderComponent } from './finalizeorder.component';

describe('FinalizeorderComponent', () => {
  let component: FinalizeorderComponent;
  let fixture: ComponentFixture<FinalizeorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizeorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalizeorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
