import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  loadingEmployee = true;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  employeeId: string;

  departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Finance',
    'Human Resources',
    'Operations'
  ];

  positions = [
    'Manager',
    'Team Lead',
    'Senior Developer',
    'Developer',
    'Analyst',
    'Coordinator'
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.employeeId = this.route.snapshot.params['id'];
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  private loadEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
        this.previewUrl = employee.profile;
        this.loadingEmployee = false;
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Error loading employee', 'Close', {
          duration: 3000
        });
        this.loadingEmployee = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.loading = true;
      const formData = new FormData();
      Object.keys(this.employeeForm.value).forEach(key => {
        formData.append(key, this.employeeForm.value[key]);
      });
      
      if (this.selectedFile) {
        formData.append('profile', this.selectedFile);
      }

      this.employeeService.updateEmployee(this.employeeId, formData).subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.snackBar.open(error.message || 'Error updating employee', 'Close', {
            duration: 3000
          });
          this.loading = false;
        }
      });
    }
  }
} 