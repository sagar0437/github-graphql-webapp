import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryBarChartComponent } from './repository-bar-chart.component';

describe('RepositoryBarChartComponent', () => {
  let component: RepositoryBarChartComponent;
  let fixture: ComponentFixture<RepositoryBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
