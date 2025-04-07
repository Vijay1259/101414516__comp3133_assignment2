import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  template: `
    <div class="container">
      <h2>Edit Employee</h2>
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
      <form *ngIf="!loading" [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName" placeholder="Enter first name">
          <mat-error *ngIf="editForm.get('firstName')?.hasError('required')">
            First name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName" placeholder="Enter last name">
          <mat-error *ngIf="editForm.get('lastName')?.hasError('required')">
            Last name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Enter email" type="email">
          <mat-error *ngIf="editForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="editForm.get('email')?.hasError('email')">
            Please enter a valid email
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Department</mat-label>
          <mat-select formControlName="department">
            <mat-option *ngFor="let dept of departments" [value]="dept">
              {{dept}}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="editForm.get('department')?.hasError('required')">
            Department is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Position</mat-label>
          <mat-select formControlName="position">
            <mat-option *ngFor="let pos of positions" [value]="pos">
              {{pos}}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="editForm.get('position')?.hasError('required')">
            Position is required
          </mat-error>
        </mat-form-field>

        <div class="button-group">
          <button mat-raised-button color="primary" type="submit" [disabled]="!editForm.valid">
            Update Employee
          </button>
          <button mat-button type="button" (click)="onCancel()">
            Cancel
          </button>
        </div>
      </form>
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

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .mat-form-field {
      width: 100%;
    }

    .button-group {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    @media (max-width: 600px) {
      .container {
        padding: 16px;
      }
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeEditComponent implements OnInit {
  editForm: FormGroup;
  loading = true;
  departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  positions = ['Developer', 'Manager', 'Designer', 'Analyst', 'Lead'];
  employeeId: string = '';
  employee: any;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (employee) => {
        this.employee = employee;
        this.editForm.patchValue(employee);
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

  onSubmit(): void {
    if (this.editForm.valid) {
      this.employeeService.updateEmployee(this.employeeId, this.editForm.value).subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.snackBar.open('Failed to update employee', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  onEdit(): void {
    if (this.employee?._id) {
      this.router.navigate(['/employees/edit', this.employee._id]);
    }
  }
} 