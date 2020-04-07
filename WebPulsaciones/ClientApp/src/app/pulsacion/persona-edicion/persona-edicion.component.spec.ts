import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaEdicionComponent } from './persona-edicion.component';

describe('PersonaEdicionComponent', () => {
  let component: PersonaEdicionComponent;
  let fixture: ComponentFixture<PersonaEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
