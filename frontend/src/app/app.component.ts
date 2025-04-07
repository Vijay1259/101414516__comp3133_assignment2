import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Employee Management System</span>
      <span class="spacer"></span>
      <ng-container *ngIf="authService.isAuthenticated()">
        <button mat-button routerLink="/employees">
          <mat-icon>people</mat-icon>
          Employees
        </button>
        <button mat-button routerLink="/employee/add">
          <mat-icon>person_add</mat-icon>
          Add Employee
        </button>
        <button mat-button (click)="authService.logout()">
          <mat-icon>exit_to_app</mat-icon>
          Logout
        </button>
      </ng-container>
      <ng-container *ngIf="!authService.isAuthenticated()">
        <button mat-button routerLink="/login">
          <mat-icon>login</mat-icon>
          Login
        </button>
        <button mat-button routerLink="/signup">
          <mat-icon>person_add</mat-icon>
          Sign Up
        </button>
      </ng-container>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .container {
      padding: 20px;
    }
    mat-toolbar {
      margin-bottom: 20px;
    }
    button {
      margin-left: 8px;
    }
    mat-icon {
      margin-right: 4px;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}