import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthService } from './services/auth.service';
import { EventMgmtPageComponent } from './pages/event-mgmt-page/event-mgmt-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterBufferPageComponent } from './pages/register-buffer-page/register-buffer-page.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginPageComponent
}, {
  path: 'register',
  component: RegisterPageComponent
}, {
  path: 'register-buffer',
  component: RegisterBufferPageComponent
}, {
  path: 'event-mgmt',
  //canActivate: [AuthGuard],
  component: EventMgmtPageComponent
}];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ToolbarComponent,
    EventMgmtPageComponent,
    RegisterPageComponent,
    RegisterBufferPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    })
  ],
  providers: [
  AuthService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
