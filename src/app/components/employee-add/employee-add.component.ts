import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  template: `
    <div class="container">
      <h2>Add New Employee</h2>
      <form [formGroup]="addForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName" placeholder="Enter first name">
          <mat-error *ngIf="addForm.get('firstName')?.hasError('required')">
            First name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName" placeholder="Enter last name">
          <mat-error *ngIf="addForm.get('lastName')?.hasError('required')">
            Last name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Enter email" type="email">
          <mat-error *ngIf="addForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="addForm.get('email')?.hasError('email')">
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
          <mat-error *ngIf="addForm.get('department')?.hasError('required')">
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
          <mat-error *ngIf="addForm.get('position')?.hasError('required')">
            Position is required
          </mat-error>
        </mat-form-field>

        <div class="button-group">
          <button mat-raised-button color="primary" type="submit" [disabled]="!addForm.valid">
            Add Employee
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
    MatButtonModule
  ]
})
export class EmployeeAddComponent {
  addForm: FormGroup;
  departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  positions = ['Developer', 'Manager', 'Designer', 'Analyst', 'Lead'];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.addForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.employeeService.createEmployee(this.addForm.value).subscribe({
        next: () => {
          this.snackBar.open('Employee added successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
          this.snackBar.open('Failed to add employee', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
} 