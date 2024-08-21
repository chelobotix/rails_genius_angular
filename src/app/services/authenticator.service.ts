import { inject, Injectable } from '@angular/core'
import { LocalstorageService } from './localstorage.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  private localstorageService = inject(LocalstorageService)
  private httpClient = inject(HttpClient)
  private base_url = 'http://127.0.0.1:3000'
  private token: string = ''

  signup(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const body = {
      email: email,
      password: password,
      password_confirmation: password,
      confirm_success_url: 'http://localhost:4200/login?type=confirmation',
    }

    return this.httpClient.post(`${this.base_url}/auth`, body, { headers: headers, observe: 'response' })
  }

  set_token(token: string) {
    this.localstorageService.updateToken(token)
  }

  constructor() {}
}
