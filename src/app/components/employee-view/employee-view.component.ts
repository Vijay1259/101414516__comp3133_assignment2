import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-view',
  template: `
    <div class="container">
      <h2>Employee Details</h2>
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
      <mat-card *ngIf="!loading && employee">
        <mat-card-content>
          <div class="employee-details">
            <div class="detail-row">
              <span class="label">First Name:</span>
              <span class="value">{{employee.firstName}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Last Name:</span>
              <span class="value">{{employee.lastName}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">{{employee.email}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Department:</span>
              <span class="value">{{employee.department}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Position:</span>
              <span class="value">{{employee.position}}</span>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="onEdit()">
            Edit
          </button>
          <button mat-button (click)="onBack()">
            Back
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .employee-details {
      padding: 16px;
    }

    .detail-row {
      display: flex;
      margin-bottom: 16px;
    }

    .label {
      font-weight: 500;
      width: 120px;
      color: #666;
    }

    .value {
      flex: 1;
    }

    mat-card-actions {
      display: flex;
      gap: 12px;
      padding: 16px;
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
      }

      .detail-row {
        flex-direction: column;
      }

      .label {
        margin-bottom: 4px;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee | null = null;
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadEmployee(id);
  }

  loadEmployee(id: string): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.snackBar.open('Failed to load employee details', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }

  onEdit(): void {
    if (this.employee?._id) {
      this.router.navigate(['/employees/edit', this.employee._id]);
    }
  }

  onBack(): void {
    this.router.navigate(['/employees']);
  }
} 