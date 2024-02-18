import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTicketComponent } from './reserve-ticket.component';

describe('ReserveTicketComponent', () => {
  let component: ReserveTicketComponent;
  let fixture: ComponentFixture<ReserveTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
