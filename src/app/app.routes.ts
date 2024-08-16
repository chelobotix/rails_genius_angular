import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { SignupComponent } from './components/authentication/signup/signup.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/authentication/login/login.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Rails Genius',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign Up',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Log in',
  },
]
