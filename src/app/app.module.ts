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
import { NgCircleProgressModule } from 'ng-circle-progress';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { EventMgmtPageComponent } from './pages/event-mgmt-page/event-mgmt-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AddEventPageComponent } from './pages/add-event-page/add-event-page.component';
import { ServiceInterceptor } from './interceptors/service-interceptor';
import { AttendeesComponent } from './pages/attendees/attendees.component';
import { AttendeeProfileComponent } from './pages/attendee-profile/attendee-profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MapComponent } from './pages/map/map.component';
import { MapDialogComponent} from'./components/map-dialog/map-dialog.component';
import { ChangePwdPageComponent } from './pages/change-pwd-page/change-pwd-page.component';
import { SpeakerComponent } from './pages/speaker/speaker.component';
import { SpeakerFullComponent } from './pages/speaker-full/speaker-full.component';
import { D3MapContainerComponent } from './components/d3-map-container/d3-map-container.component';
import { GoLivePageComponent } from './pages/go-live-page/go-live-page.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AnalysisPageComponent } from './pages/analysis-page/analysis-page.component';
import { AnalysisHeatmapComponent } from './components/analysis-heatmap/analysis-heatmap.component';

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
  path: 'add-event',
  // canActivate: [AuthGuard],
  component: AddEventPageComponent
}, {
  path: ':id/attendees',
  // canActivate: [AuthGuard],
  component: AttendeesComponent
}, {
  path: ':id/attendee-profile',
  // canActivate: [AuthGuard],
  component: AttendeeProfileComponent
}, {
  path: ':id/home',
  component : HomePageComponent
}, {
  path: 'change-pwd',
  component : ChangePwdPageComponent
}, {
  path: ':id/map',
  component : MapComponent
}, {
  path: ':id/speaker',
  component : SpeakerComponent
}, {
  path: 'speaker-full',
  component : SpeakerFullComponent
}, {
  path: ':id/go-live',
  component: GoLivePageComponent
},{
  path:':id/analysis',
  component: AnalysisPageComponent
}];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ToolbarComponent,
    EventMgmtPageComponent,
    RegisterPageComponent,
    AddEventPageComponent,
    AttendeesComponent,
    AttendeeProfileComponent,
    HomePageComponent,
    MapComponent,
    ChangePwdPageComponent,
    SpeakerComponent,
    SpeakerFullComponent,
    D3MapContainerComponent,
    GoLivePageComponent,
    SafeHtmlPipe,
    AnalysisPageComponent,
    MapDialogComponent,
    AnalysisHeatmapComponent
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
      enableTracing: true,
      useHash: true
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "outerStrokeWidth": 10,
      "innerStrokeWidth": 5,
      "showBackground": false
    }),
    NgxChartsModule
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
