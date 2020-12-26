import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingsTableComponent } from './bankings-table.component';

describe('BankingsPanelComponent', () => {
  let component: BankingsTableComponent;
  let fixture: ComponentFixture<BankingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
