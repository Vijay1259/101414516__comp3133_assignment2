import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'employees',
    loadComponent: () => import('./components/employee-list/employee-list.component')
      .then(m => m.EmployeeListComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/add',
    loadComponent: () => import('./components/employee-add/employee-add.component')
      .then(m => m.EmployeeAddComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/edit/:id',
    loadComponent: () => import('./components/employee-edit/employee-edit.component')
      .then(m => m.EmployeeEditComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id',
    loadComponent: () => import('./components/employee-view/employee-view.component')
      .then(m => m.EmployeeViewComponent),
    canActivate: [AuthGuard]
  }
]; 