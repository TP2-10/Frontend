import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { GenerateStoriesComponent } from './pages/stories/generate-stories/generate-stories.component';
import { StoriesComponent } from './pages/stories/Component/stories.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  
  //{
  //  path: 'dashboard/profile',
  //  component: UserProfileComponent,
  //},
  {
    path: '',
    component: DashboardComponent,
    //canActivate: [AuthenticationGuard, VerificarTokenGuard],
    children: [
      {
        path: 'dashboard',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'profile', component: UserProfileComponent
      },
      {
        path: 'generatestories', component: GenerateStoriesComponent
      },
      {
        path: 'stories', component: StoriesComponent
      },
      {
        path: 'stories/:id', component: StoriesComponent
      },
      {
        path: 'login',
        redirectTo: 'login',
        pathMatch: 'full',
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
