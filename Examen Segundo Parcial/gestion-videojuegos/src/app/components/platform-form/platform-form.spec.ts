import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformForm } from './platform-form';

describe('PlatformForm', () => {
  let component: PlatformForm;
  let fixture: ComponentFixture<PlatformForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
