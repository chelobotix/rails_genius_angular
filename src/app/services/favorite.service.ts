import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthenticatorService } from './authenticator.service'

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private httpClient = inject(HttpClient)
  private authenticatorService = inject(AuthenticatorService)

  private base_url = 'http://127.0.0.1:3000/api/v1'

  // private base_url = 'https://rails-genius.fly.dev/api/v1'

  check(post_id: number) {
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.get<any>(`${this.base_url}/posts/${post_id}/favorites`, { headers: headers })
  }

  toggle(post_id: number) {
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.get<any>(`${this.base_url}/posts/${post_id}/favorites/toggle`, { headers: headers })
  }

  getFavorites = () => {
    //Metele la logica aca, necesitas sacar los datos del user
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.get<any>(`${this.base_url}/posts/${post_id}/favorites`, { headers: headers })
  }
}
