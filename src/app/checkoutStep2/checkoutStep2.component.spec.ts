import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { checkoutStep2Component } from './checkoutStep2.component';


describe('CategorySearchComponent', () => {
  let component: checkoutStep2Component;
  let fixture: ComponentFixture<checkoutStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [checkoutStep2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(checkoutStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
