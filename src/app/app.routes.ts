import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { SignupComponent } from './components/authentication/signup/signup.component'
import { HomeComponent } from './components/home/home.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Rails Genius - Home',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Rails Genius - Sign Up',
  },
]
