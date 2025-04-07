import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule
  ]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];
  employees: any[] = [];
  loading = false;
  searchControl = new FormControl('');

  departments = [
    'All Departments',
    'Engineering',
    'Marketing',
    'Sales',
    'Finance',
    'Human Resources',
    'Operations'
  ];

  positions = [
    'All Positions',
    'Manager',
    'Team Lead',
    'Senior Developer',
    'Developer',
    'Analyst',
    'Coordinator'
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.setupSearch();
  }

  private loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.loading = true;
        this.employeeService.searchEmployees(value).subscribe({
          next: (data) => {
            this.employees = data;
            this.loading = false;
          },
          error: (error) => {
            this.snackBar.open(error.message || 'Error searching employees', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
            this.loading = false;
          }
        });
      } else {
        this.loadEmployees();
      }
    });
  }

  filterByDepartment(department: string): void {
    if (department === 'All Departments') {
      this.loadEmployees();
    } else {
      this.loading = true;
      this.employeeService.searchEmployees(department).subscribe({
        next: (data) => {
          this.employees = data;
          this.loading = false;
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Error filtering employees', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    }
  }

  filterByPosition(position: string): void {
    if (position === 'All Positions') {
      this.loadEmployees();
    } else {
      this.loading = true;
      this.employeeService.searchEmployees(position).subscribe({
        next: (data) => {
          this.employees = data;
          this.loading = false;
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Error filtering employees', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    }
  }

  viewEmployee(employee: any): void {
    this.router.navigate(['/employees/view', employee.id]);
  }

  editEmployee(employee: any): void {
    this.router.navigate(['/employees/edit', employee.id]);
  }

  deleteEmployee(employee: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Employee',
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(employee.id).subscribe({
          next: () => {
            this.snackBar.open('Employee deleted successfully', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
      }
    });
  }
} 