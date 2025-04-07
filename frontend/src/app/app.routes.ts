import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee/add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employee/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: 'employee/view/:id', component: EmployeeViewComponent, canActivate: [AuthGuard] }
];