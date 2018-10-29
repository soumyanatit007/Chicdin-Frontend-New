import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { startBookingComponent } from './startBooking.component';

describe('CategorySearchComponent', () => {
  let component: startBookingComponent;
  let fixture: ComponentFixture<startBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [startBookingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(startBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
