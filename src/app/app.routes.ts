import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { SignupComponent } from './components/authentication/signup/signup.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/authentication/login/login.component'
import { SuccessComponent } from './components/authentication/success/success.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { NewPostComponent } from './components/posts/new-post/new-post.component'
import { PostComponent } from './components/posts/post/post.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Rails Genius',
  },
  {
    path: 'auth',
    children: [
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
      {
        path: 'success',
        component: SuccessComponent,
        title: 'Success',
      },
    ],
  },
  {
    path: 'posts',
    children: [
      {
        path: 'new',
        component: NewPostComponent,
        title: 'New Post',
      },
      {
        path: ':id',
        component: PostComponent,
        title: 'Rails Genius',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]
