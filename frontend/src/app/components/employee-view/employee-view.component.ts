import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="page-container">
      <div class="content-wrapper">
        <div class="header">
          <h2>Employee Details</h2>
        </div>
        
        <div class="employee-card">
          <div class="info-section" *ngIf="employee">
            <div class="info-group">
              <label>First Name</label>
              <span>{{employee.firstName}}</span>
            </div>
            
            <div class="info-group">
              <label>Last Name</label>
              <span>{{employee.lastName}}</span>
            </div>
            
            <div class="info-group">
              <label>Email</label>
              <span>{{employee.email}}</span>
            </div>
            
            <div class="info-group">
              <label>Department</label>
              <span>{{employee.department}}</span>
            </div>
            
            <div class="info-group">
              <label>Position</label>
              <span>{{employee.position}}</span>
            </div>
          </div>

          <div class="loading-message" *ngIf="!employee">
            Loading employee details...
          </div>

          <div class="button-group">
            <button mat-raised-button class="action-btn edit-btn" (click)="onEdit()">
              <mat-icon>edit</mat-icon>
              <span class="btn-text">Edit</span>
            </button>
            <button mat-raised-button class="action-btn back-btn" (click)="onBack()">
              <mat-icon>arrow_back</mat-icon>
              <span class="btn-text">Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
    }

    .employee-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .info-group {
      display: flex;
      align-items: baseline;
      padding-bottom: 1rem;
      border-bottom: 1px solid #edf2f7;
      gap: 2rem;
    }

    label {
      min-width: 140px;
      color: #7f8c8d;
      font-weight: 600;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    span {
      color: #2c3e50;
      font-size: 1rem;
      flex: 1;
      letter-spacing: 0.3px;
    }

    .loading-message {
      text-align: center;
      color: #7f8c8d;
      font-size: 1rem;
      padding: 2rem;
      letter-spacing: 0.3px;
    }

    .button-group {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .action-btn {
      min-width: 140px;
      height: 44px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 500;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      transition: all 0.3s ease;
    }

    .btn-text {
      display: inline-block;
      margin-right: 4px;
      letter-spacing: 0.8px;
    }

    .edit-btn {
      background: linear-gradient(45deg, #f39c12, #d68910) !important;
      color: white !important;
      box-shadow: 0 4px 15px rgba(243, 156, 18, 0.2);
    }

    .back-btn {
      background: linear-gradient(45deg, #95a5a6, #7f8c8d) !important;
      color: white !important;
      box-shadow: 0 4px 15px rgba(149, 165, 166, 0.2);
    }

    .edit-btn:hover, .back-btn:hover {
      transform: translateY(-2px);
    }

    .edit-btn:hover {
      box-shadow: 0 6px 20px rgba(243, 156, 18, 0.3);
    }

    .back-btn:hover {
      box-shadow: 0 6px 20px rgba(149, 165, 166, 0.3);
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }

      .content-wrapper {
        padding: 1.5rem;
      }

      h2 {
        font-size: 1.5rem;
        letter-spacing: 1px;
      }

      .employee-card {
        padding: 1.5rem;
      }

      .info-group {
        flex-direction: column;
        gap: 0.75rem;
      }

      label {
        min-width: unset;
        font-size: 0.9rem;
        letter-spacing: 0.6px;
      }

      span {
        font-size: 0.95rem;
        letter-spacing: 0.2px;
      }

      .button-group {
        flex-direction: column;
        gap: 1rem;
      }

      .action-btn {
        width: 100%;
        font-size: 0.85rem;
        letter-spacing: 0.5px;
        gap: 8px;
      }
    }

    @media (max-width: 576px) {
      .page-container {
        padding: 0.75rem;
      }

      .content-wrapper {
        padding: 1rem;
      }

      .employee-card {
        padding: 1rem;
      }

      h2 {
        font-size: 1.25rem;
        letter-spacing: 0.8px;
      }

      label {
        font-size: 0.85rem;
        letter-spacing: 0.5px;
      }

      span {
        font-size: 0.9rem;
        letter-spacing: 0.2px;
      }

      .action-btn {
        font-size: 0.8rem;
        letter-spacing: 0.4px;
      }
    }
  `]
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
          this.snackBar.open('Error fetching employee details', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/employees']);
        }
      });
    }
  }

  onEdit(): void {
    if (this.employee?._id) {
      this.router.navigate(['/employee/edit', this.employee._id]);
    }
  }

  onBack(): void {
    this.router.navigate(['/employees']);
  }
}