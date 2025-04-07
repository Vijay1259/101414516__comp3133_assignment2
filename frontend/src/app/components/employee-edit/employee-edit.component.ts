import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <h2>Update Employee</h2>
      <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName" placeholder="Enter first name">
          <mat-error *ngIf="editForm.get('firstName')?.invalid && editForm.get('firstName')?.touched">
            First Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName" placeholder="Enter last name">
          <mat-error *ngIf="editForm.get('lastName')?.invalid && editForm.get('lastName')?.touched">
            Last Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Enter email" type="email">
          <mat-error *ngIf="editForm.get('email')?.invalid && editForm.get('email')?.touched">
            <span *ngIf="editForm.get('email')?.errors?.['required']">Email is required</span>
            <span *ngIf="editForm.get('email')?.errors?.['email']">Please enter a valid email</span>
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Department</mat-label>
          <mat-select formControlName="department">
            <mat-option *ngFor="let dept of departments" [value]="dept">
              {{dept}}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="editForm.get('department')?.invalid && editForm.get('department')?.touched">
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
          <mat-error *ngIf="editForm.get('position')?.invalid && editForm.get('position')?.touched">
            Position is required
          </mat-error>
        </mat-form-field>

        <div class="button-group">
          <button mat-raised-button color="primary" type="submit" [disabled]="!editForm.valid">
            <mat-icon>save</mat-icon>
            Update
          </button>
          <button mat-raised-button type="button" (click)="onCancel()">
            <mat-icon>cancel</mat-icon>
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .button-group {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class EmployeeEditComponent implements OnInit {
  editForm: FormGroup;
  departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  positions = ['Developer', 'Manager', 'Designer', 'Analyst', 'Lead'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: (employee) => {
          this.editForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            department: employee.department,
            position: employee.position
          });
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
          this.snackBar.open('Error fetching employee details', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const id = this.route.snapshot.params['id'];
      const updatedEmployee: Employee = {
        _id: id,
        ...this.editForm.value
      };

      this.employeeService.updateEmployee(id, updatedEmployee).subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.snackBar.open('Error updating employee', 'Close', {
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