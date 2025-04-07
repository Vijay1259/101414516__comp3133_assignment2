import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService, Employee } from '../../services/employee.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  template: `
    <div class="container">
      <div class="header">
        <h2>Employees</h2>
        <button mat-raised-button color="primary" (click)="router.navigate(['/employees/add'])">
          <mat-icon>add</mat-icon>
          Add Employee
        </button>
      </div>

      <div class="filters">
        <mat-card>
          <mat-card-content>
            <div class="filter-section">
              <h3>Filter by Department</h3>
              <div class="filter-buttons">
                <button mat-stroked-button
                  *ngFor="let dept of departments"
                  (click)="filterByDepartment(dept)">
                  {{dept}}
                </button>
              </div>
            </div>
            <mat-divider></mat-divider>
            <div class="filter-section">
              <h3>Filter by Position</h3>
              <div class="filter-buttons">
                <button mat-stroked-button
                  *ngFor="let pos of positions"
                  (click)="filterByPosition(pos)">
                  {{pos}}
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="error" class="error-message">
        {{error}}
      </div>

      <div *ngIf="!loading && !employees.length" class="empty-state">
        <mat-icon>people_outline</mat-icon>
        <h3>No Employees Found</h3>
        <p>There are no employees matching your criteria.</p>
      </div>

      <div class="employee-grid" *ngIf="!loading && employees.length">
        <mat-card *ngFor="let employee of employees" class="employee-card">
          <mat-card-header>
            <div mat-card-avatar class="employee-avatar">
              {{employee.firstName[0]}}{{employee.lastName[0]}}
            </div>
            <mat-card-title>{{employee.firstName}} {{employee.lastName}}</mat-card-title>
            <mat-card-subtitle>{{employee.position}}</mat-card-subtitle>
            <button mat-icon-button [matMenuTriggerFor]="menu" class="more-button">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="viewEmployee(employee._id!)">
                <mat-icon>visibility</mat-icon>
                <span>View</span>
              </button>
              <button mat-menu-item (click)="updateEmployee(employee._id!)">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
              <button mat-menu-item (click)="onDelete(employee)">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
              </button>
            </mat-menu>
          </mat-card-header>
          <mat-card-content>
            <p><mat-icon>email</mat-icon> {{employee.email}}</p>
            <p><mat-icon>business</mat-icon> {{employee.department}}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h2 {
      margin: 0;
      color: #333;
    }

    .filters {
      margin-bottom: 20px;
    }

    .filter-section {
      padding: 16px;
    }

    .filter-section h3 {
      margin: 0 0 12px 0;
      color: #666;
      font-size: 16px;
    }

    .filter-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .error-message {
      color: #f44336;
      text-align: center;
      padding: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
    }

    .empty-state p {
      margin: 0;
    }

    .employee-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .employee-card {
      position: relative;
    }

    .employee-avatar {
      background-color: #1976d2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      text-transform: uppercase;
    }

    .more-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    mat-card-content {
      padding-top: 16px;
    }

    mat-card-content p {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      color: #666;
    }

    mat-card-content mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
      }

      .employee-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error = '';
  departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  positions = ['Developer', 'Manager', 'Designer', 'Analyst', 'Lead'];

  constructor(
    private employeeService: EmployeeService,
    public router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployeesList().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error fetching employees';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && employee._id) {
        this.employeeService.deleteEmployee(employee._id).subscribe({
          next: () => {
            this.snackBar.open('Employee deleted successfully', 'Close', {
              duration: 3000
            });
            this.getEmployees();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
            this.snackBar.open('Failed to delete employee', 'Close', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  filterByDepartment(department: string): void {
    this.loading = true;
    this.employeeService.getEmployeesList().subscribe({
      next: (employees) => {
        this.employees = employees.filter(emp => emp.department === department);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error filtering employees';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  filterByPosition(position: string): void {
    this.loading = true;
    this.employeeService.getEmployeesList().subscribe({
      next: (employees) => {
        this.employees = employees.filter(emp => emp.position === position);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error filtering employees';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees', id]);
  }

  updateEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }
} 