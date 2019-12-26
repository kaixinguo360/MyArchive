import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFootComponent } from './card-foot.component';

describe('CardFootComponent', () => {
  let component: CardFootComponent;
  let fixture: ComponentFixture<CardFootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
