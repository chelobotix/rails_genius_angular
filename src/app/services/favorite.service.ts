import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthenticatorService } from './authenticator.service'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private httpClient = inject(HttpClient)
  private authenticatorService = inject(AuthenticatorService)

  private base_url = environment.base_url

  check(post_id: number) {
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.get<any>(`${this.base_url}/api/v1/posts/${post_id}/favorites`, { headers: headers })
  }

  toggle(post_id: number) {
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.get<any>(`${this.base_url}/api/v1/posts/${post_id}/favorites/toggle`, { headers: headers })
  }

  getFavorites() {
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.get<any>(`${this.base_url}/auth/user_favorites`, { headers: headers })
  }
}
