import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSnackBarModule,
    RouterModule
  ],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="header">
          <h1>Employees List</h1>
          <button mat-raised-button class="add-button" routerLink="/employee/add">
            Add Employee
          </button>
        </div>

        <div class="table-container">
          <table class="employee-table">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let employee of employees">
                <td>{{employee.firstName}}</td>
                <td>{{employee.lastName}}</td>
                <td>{{employee.email}}</td>
                <td class="actions-cell">
                  <button mat-raised-button class="action-btn update-btn" (click)="viewEmployee(employee._id || '')">
                    Update
                  </button>
                  <button mat-raised-button class="action-btn edit-btn" (click)="updateEmployee(employee._id || '')">
                    Edit
                  </button>
                  <button mat-raised-button class="action-btn delete-btn" (click)="deleteEmployee(employee._id || '')">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background-color: #fff;
      padding: 20px;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      color: #333;
    }

    .add-button {
      background-color: #007bff !important;
      color: white !important;
      padding: 0 20px;
      height: 36px;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
    }

    .employee-table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background-color: #f8f9fa;
      padding: 12px 16px;
      text-align: left;
      font-weight: 500;
      color: #333;
      font-size: 14px;
      border-bottom: 1px solid #dee2e6;
    }

    td {
      padding: 12px 16px;
      border-bottom: 1px solid #dee2e6;
      font-size: 14px;
      color: #333;
    }

    .actions-cell {
      white-space: nowrap;
    }

    .action-btn {
      min-width: 70px;
      margin-right: 8px;
      font-size: 13px;
      text-transform: none;
      box-shadow: none !important;
    }

    .update-btn {
      background-color: #17a2b8 !important;
      color: white !important;
    }

    .edit-btn {
      background-color: #ffc107 !important;
      color: #000 !important;
    }

    .delete-btn {
      background-color: #dc3545 !important;
      color: white !important;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 10px;
      }

      .content-wrapper {
        padding: 15px;
      }

      .header {
        flex-direction: column;
        gap: 15px;
      }

      h1 {
        text-align: center;
      }

      .add-button {
        width: 100%;
      }

      .action-btn {
        margin: 4px;
        padding: 0 8px;
      }

      td, th {
        padding: 8px;
      }
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (error: Error) => {
        console.error('Error fetching employees:', error);
        this.snackBar.open('Error loading employees', 'Close', {
          duration: 3000
        });
      }
    });
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employee/view', id]);
  }

  updateEmployee(id: string): void {
    this.router.navigate(['/employee/edit', id]);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
          this.snackBar.open('Employee deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: (error: Error) => {
          console.error('Error deleting employee:', error);
          this.snackBar.open('Error deleting employee', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
