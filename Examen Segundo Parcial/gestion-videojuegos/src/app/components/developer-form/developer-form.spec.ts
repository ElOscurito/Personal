import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperForm } from './developer-form';

describe('DeveloperForm', () => {
  let component: DeveloperForm;
  let fixture: ComponentFixture<DeveloperForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
