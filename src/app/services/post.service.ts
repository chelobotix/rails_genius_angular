import { inject, Injectable, signal } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { IPost } from '../models/post.model'
import { IPosts } from '../models/posts.model'
import { truncate } from '../utils/truncate'
import { AuthenticatorService } from './authenticator.service'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpClient = inject(HttpClient)
  private authenticatorService = inject(AuthenticatorService)
  private base_url = environment.base_url
  private posts = signal<IPosts>({ posts: [] })
  private searchedPosts = signal<IPosts>({ posts: [] })
  actualPosts = this.posts.asReadonly()
  actualSearchedPosts = this.searchedPosts.asReadonly()

  empty_searchedPosts() {
    this.searchedPosts.set({ posts: [] })
  }

  searchPosts(query: string) {
    return this.postRequest<IPosts>(`/search_posts?q[title_or_body_or_tags_cont]=${query}`, {}, {}).pipe(
      tap((response) => {
        const result: IPosts = { posts: [] }
        result.posts = response.posts.map((post: IPost) => {
          const index = post.body.toLowerCase().indexOf(query.toLowerCase())
          post.body = truncate(post.body, index, 40)

          if (typeof post.tags === 'string') {
            post.tags = post.tags.split(',')
          }

          return post
        })
        this.searchedPosts.set(result)
      })
    )
  }

  newPost(formData: FormData) {
    const headers = this.authenticatorService.include_credentials_headers()
    return this.httpClient.post(`${this.base_url}/api/v1/posts`, formData, { headers: headers })
  }

  getPosts() {
    return this.getRequest<IPosts>('/posts').pipe(
      tap((data) => {
        this.posts.set(data)
      }))
  }

  getPost(id: string) {
    return this.getRequest<any>(`/posts/${id}`)
  }

  private getRequest<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${this.base_url}/api/v1${endpoint}`)
  }

  private postRequest<T>(endpoint: string, header: {}, body: {}) {
    const headers = new HttpHeaders(header)

    return this.httpClient.post<T>(`${this.base_url}/api/v1${endpoint}`, body, { headers: headers })
  }
}
