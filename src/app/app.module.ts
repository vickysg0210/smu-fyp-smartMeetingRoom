import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgUploaderModule } from 'ngx-uploader';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { EventMgmtPageComponent } from './pages/event-mgmt-page/event-mgmt-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AddEventPageComponent } from './pages/add-event-page/add-event-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { ServiceInterceptor } from './interceptors/service-interceptor';
import { AttendeesComponent } from './pages/attendees/attendees.component';
import { AttendeeProfileComponent } from './pages/attendee-profile/attendee-profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

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
}, {
  path: 'attendees',
  // canActivate: [AuthGuard],
  component: AttendeesComponent
}, {
  path: 'attendees/attendee-profile',
  // canActivate: [AuthGuard],
  component: AttendeeProfileComponent
}];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ToolbarComponent,
    EventMgmtPageComponent,
    RegisterPageComponent,
    AddEventPageComponent,
    EventPageComponent,
    AttendeesComponent,
    AttendeeProfileComponent,
    HomePageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgUploaderModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  },
  ApiService,
  AuthService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
