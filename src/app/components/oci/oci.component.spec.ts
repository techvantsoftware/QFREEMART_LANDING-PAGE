import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OciComponent } from './oci.component';

describe('OciComponent', () => {
  let component: OciComponent;
  let fixture: ComponentFixture<OciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OciComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
