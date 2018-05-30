import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDividerModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthService } from './services/auth.service';
import { ViewService } from './services/view.service';
import { EventMgmtPageComponent } from './pages/event-mgmt-page/event-mgmt-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterBufferPageComponent } from './pages/register-buffer-page/register-buffer-page.component';
import { AddEventPageComponent } from './pages/add-event-page/add-event-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

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
  // canActivate: [AuthGuard],
  component: EventMgmtPageComponent
}, {
  path: 'event-mgmt/:id',
  // canActivate: [AuthGuard],
  component: EventPageComponent
}, {
  path: 'add-event',
  // canActivate: [AuthGuard],
  component: AddEventPageComponent
}];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ToolbarComponent,
    EventMgmtPageComponent,
    RegisterPageComponent,
    RegisterBufferPageComponent,
    AddEventPageComponent,
    EventPageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDividerModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    })
  ],
  providers: [
  AuthService,
  ViewService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
