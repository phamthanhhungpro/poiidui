import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeebackChitietComponent } from './feeback-chitiet.component';

describe('FeebackChitietComponent', () => {
  let component: FeebackChitietComponent;
  let fixture: ComponentFixture<FeebackChitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeebackChitietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeebackChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
