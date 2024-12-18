import { inject, Injectable, signal } from '@angular/core'
import { LocalstorageService } from './localstorage.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ICredentials } from '../models/credentials.model'
import { catchError, finalize, map, Observable, of, tap } from 'rxjs'
import { LoaderService } from './loader.service'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  private localstorageService = inject(LocalstorageService)
  private loaderService = inject(LoaderService)
  private httpClient = inject(HttpClient)
  private base_url = environment.base_url

  private credentials = signal<ICredentials>({
    'access-token': '',
    'token-type': '',
    client: '',
    expiry: '',
    uid: '',
  })
  actualCredentials = this.credentials.asReadonly()

  private isAuthenticated = signal(false)
  actualIsAuthenticated = this.isAuthenticated.asReadonly()

  private isAuthenticationChecked = signal(false)
  actualIsAuthenticationChecked = this.isAuthenticationChecked.asReadonly()

  private headers = signal({})
  actualHeaders = this.headers.asReadonly()

  signup(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const body = {
      email: email,
      password: password,
      password_confirmation: password,
    }

    return this.httpClient.post(`${this.base_url}/auth`, body, { headers: headers, observe: 'response' })
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const body = {
      email: email,
      password: password,
    }

    return this.httpClient.post(`${this.base_url}/auth/sign_in`, body, { headers: headers, observe: 'response' })
  }

  logout() {
    this.isAuthenticated.set(false)
    return this.httpClient
      .delete(`${this.base_url}/auth/sign_out`, { headers: this.include_credentials_headers() })
      .pipe(
        tap(() => {
          this.localstorageService.updateCredentials({
            'access-token': '',
            'token-type': '',
            client: '',
            expiry: '',
            uid: '',
          })
          this.isAuthenticated.set(false)
        })
      )
  }

  changePassword(password: string) {
    const body = {
      password: password,
      password_confirmation: password,
    }
    return this.httpClient.put(`${this.base_url}/auth/password`, body, { headers: this.include_credentials_headers() })
  }

  set_credentials(authHeader: HttpHeaders) {
    this.credentials.set({
      'access-token': authHeader.get('access-token') as string,
      'token-type': authHeader.get('token-type') as string,
      client: authHeader.get('client') as string,
      expiry: authHeader.get('expiry') as string,
      uid: authHeader.get('uid') as string,
    })
    this.isAuthenticated.set(true)
    this.localstorageService.updateCredentials(this.credentials() as ICredentials)
  }

  include_credentials_headers() {
    return new HttpHeaders({
      'access-token': this.credentials()['access-token'],
      'token-type': this.credentials()['token-type'],
      client: this.credentials()['client'],
      expiry: this.credentials()['expiry'],
      uid: this.credentials()['uid'],
    })
  }

  validate_session(): Observable<boolean> {
    this.credentials.set(this.localstorageService.actualData().credentials)
    const url = `${this.base_url}/auth/validate_token?uid=${this.credentials()['uid']}&client=${this.credentials()['client']}&access-token=${this.credentials()['access-token']}`
    return this.httpClient.get(url).pipe(
      map(() => {
        this.isAuthenticated.set(true)
        this.loaderService.hideLoader()
        return true
      }),
      catchError((error) => {
        this.isAuthenticated.set(false)
        return of(false)
      }),
      finalize(() => {
        this.isAuthenticationChecked.set(true)
      })
    )
  }
}
