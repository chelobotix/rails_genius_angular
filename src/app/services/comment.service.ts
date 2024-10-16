import { inject, Injectable } from '@angular/core'
import { IPosts } from '../models/posts.model'
import { tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticatorService } from './authenticator.service'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private httpClient = inject(HttpClient)
  private authenticatorService = inject(AuthenticatorService)
  private base_url = 'http://localhost:3000/api/v1'

  // private base_url = 'https://rails-genius.fly.dev/api/v1'

  new(content: string, post_id: number) {
    const headers = this.authenticatorService.include_credentials_headers()

    const body = {
      body: content,
      parent_comment_id: null,
    }

    return this.httpClient.post<any>(`${this.base_url}/posts/${post_id}/comments`, body, { headers: headers })
  }
}
