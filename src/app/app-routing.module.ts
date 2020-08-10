import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { RootGuard } from './utilities/guards/root.guard';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuard } from './utilities/guards/auth.guard';
import { Roles } from './models/enums/roles';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserInviteComponent } from './components/user/user-invite/user-invite.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [RootGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'users/details', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'users/edit', component: UserEditComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'users/invite', component: UserInviteComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
