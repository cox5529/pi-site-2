import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserInviteComponent } from './components/user/user-invite/user-invite.component';
import { ScreenListComponent } from './components/screen/screen-list/screen-list.component';
import { ScreenEditComponent } from './components/screen/screen-edit/screen-edit.component';
import { ScreenCreateComponent } from './components/screen/screen-create/screen-create.component';
import { ScreenDetailsComponent } from './components/screen/screen-details/screen-details.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ScreenPreviewComponent } from './components/screen/screen-preview/screen-preview.component';
import { ClockTileComponent } from './components/screen/tile/clock-tile/clock-tile.component';
import { TileCreateComponent } from './components/screen/tile/tile-create/tile-create.component';
import { TileEditComponent } from './components/screen/tile/tile-edit/tile-edit.component';
import { ClockTileSettingsComponent } from './components/screen/tile/clock-tile/settings/clock-tile-settings.component';
import { TileContainerComponent } from './components/screen/tile/tile-container/tile-container.component';
import { TileConfigurationComponent } from './components/screen/tile/tile-configuration/tile-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserInviteComponent,
    ScreenListComponent,
    ScreenEditComponent,
    ScreenCreateComponent,
    ScreenDetailsComponent,
    ConfirmationDialogComponent,
    ScreenPreviewComponent,
    ClockTileComponent,
    TileCreateComponent,
    TileEditComponent,
    ClockTileSettingsComponent,
    TileContainerComponent,
    TileConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
