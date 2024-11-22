import { Routes } from '@angular/router'
import { SignupComponent } from './components/authentication/signup/signup.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/authentication/login/login.component'
import { SuccessComponent } from './components/authentication/success/success.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { NewPostComponent } from './components/posts/new-post/new-post.component'
import { PostContentComponent } from './components/posts/post/post-content.component'
import { NewPostGuard } from './guards/new-post.guard'
import { ModerateCommentsComponent } from './components/moderate-comments/moderate-comments.component'

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
        canActivate: [NewPostGuard],
      },
      {
        path: ':id',
        component: PostContentComponent,
        title: 'Rails Genius',
      },
    ],
  },
  {
    path: 'moderate_comments',
    component: ModerateCommentsComponent,
    title: 'Moderate',
    canActivate: [NewPostGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]
