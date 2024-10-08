import { inject, Injectable } from '@angular/core'
import { IPosts } from '../models/posts.model'
import { tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticatorService } from './authenticator.service'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private httpClient = inject(HttpClient)
  private authenticatorService = inject(AuthenticatorService)
  private base_url = environment.base_url

  new(content: string, postId: number, commentId: number = 0) {
    const headers = this.authenticatorService.include_credentials_headers()

    const body = {
      body: content,
      parent_comment_id: commentId == 0 ? null : commentId,
    }

    return this.httpClient.post<any>(`${this.base_url}/api/v1/posts/${postId}/comments`, body, { headers: headers })
  }

  edit(content: string, postId: number, commentId: number) {
    const headers = this.authenticatorService.include_credentials_headers()

    const body = {
      body: content,
    }

    return this.httpClient.patch<any>(`${this.base_url}/api/v1/posts/${postId}/comments/${commentId}`, body, {
      headers: headers,
    })
  }

  delete(postId: number, commentId: number) {
    const headers = this.authenticatorService.include_credentials_headers()

    return this.httpClient.delete<any>(`${this.base_url}/api/v1/posts/${postId}/comments/${commentId}`, {
      headers: headers,
    })
  }

  pendingModeration() {
    const headers = this.authenticatorService.include_credentials_headers()

    return this.httpClient.get<any>(`${this.base_url}/api/v1/unapproved_comments`, {
      headers: headers,
    })
  }

  handleModeration(postId: number, commentId: number, status: string) {
    const headers = this.authenticatorService.include_credentials_headers()

    const body = {
      status: status,
    }

    return this.httpClient.post<any>(`${this.base_url}/api/v1/posts/${postId}/comments/${commentId}/approve`, body, {
      headers: headers,
    })
  }
}
