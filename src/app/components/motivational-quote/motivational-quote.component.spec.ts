import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationalQuoteComponent } from './motivational-quote.component';

describe('MotivationalQuoteComponent', () => {
  let component: MotivationalQuoteComponent;
  let fixture: ComponentFixture<MotivationalQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivationalQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationalQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
