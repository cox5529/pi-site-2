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
import { ScreenListComponent } from './components/screen/screen-list/screen-list.component';
import { ScreenDetailsComponent } from './components/screen/screen-details/screen-details.component';
import { ScreenEditComponent } from './components/screen/screen-edit/screen-edit.component';
import { ScreenCreateComponent } from './components/screen/screen-create/screen-create.component';
import { TileEditComponent } from './components/screen/tile/tile-edit/tile-edit.component';
import { TileCreateComponent } from './components/screen/tile/tile-create/tile-create.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [RootGuard] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'users/details', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'users/edit', component: UserEditComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'users/invite', component: UserInviteComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Administrator] } },
  { path: 'screen', component: ScreenListComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Screen] } },
  { path: 'screen/details', component: ScreenDetailsComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Screen] } },
  { path: 'screen/edit', component: ScreenEditComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Screen] } },
  { path: 'screen/create', component: ScreenCreateComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Screen] } },
  { path: 'screen/tile/edit', component: TileEditComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Screen] } },
  { path: 'screen/tile/create', component: TileCreateComponent, canActivate: [AuthGuard], data: { roles: Roles[Roles.Screen] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
