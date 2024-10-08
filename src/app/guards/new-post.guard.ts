import { inject, Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthenticatorService } from '../services/authenticator.service'
import { catchError, map, Observable, of } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class NewPostGuard implements CanActivate {
  private router = inject(Router)
  private as = inject(AuthenticatorService)

  canActivate(): Observable<boolean> {
    const masterEmail: string = fetch(environment.masterEmail) as string
    return this.as.validate_session().pipe(
      map((response) => {
        console.log(response)
        if (response && this.as.actualCredentials().uid == masterEmail) {
          return true
        } else {
          this.router.navigate(['/'])
          return false
        }
      }),
      catchError((error) => {
        console.log(error)
        this.router.navigate(['/'])
        return of(false)
      })
    )
  }
}
