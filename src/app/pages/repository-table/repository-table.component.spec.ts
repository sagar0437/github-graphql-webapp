import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryTableComponent } from './repository-table.component';

describe('RepositoryTableComponent', () => {
  let component: RepositoryTableComponent;
  let fixture: ComponentFixture<RepositoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
