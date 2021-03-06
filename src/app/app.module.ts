import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { MotivationalQuoteComponent } from './components/motivational-quote/motivational-quote.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { PushNotificationService } from 'ngx-push-notifications';


import {AuthGuard} from './guards/auth.guard';
import { PomodoroTimerComponent } from './components/pomodoro-timer/pomodoro-timer.component';






const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'motivational-quote', component: MotivationalQuoteComponent, canActivate: [AuthGuard]},
  {path: 'pomodoro-timer', component: PomodoroTimerComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    MotivationalQuoteComponent,
    PomodoroTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
