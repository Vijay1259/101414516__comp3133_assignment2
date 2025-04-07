import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Employee Management System</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/employees">Employees</button>
      <button mat-button routerLink="/employees/add">Add Employee</button>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `],
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule]
})
export class AppComponent {
  title = 'Employee Management System';
} 