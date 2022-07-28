import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoopBookComponent } from './shoop-book.component';

describe('ShoopBookComponent', () => {
  let component: ShoopBookComponent;
  let fixture: ComponentFixture<ShoopBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoopBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoopBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
