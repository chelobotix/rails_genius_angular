import { inject, Injectable, signal } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, of, pipe, tap } from 'rxjs'
import { IPost } from '../models/post.model'
import { IPosts } from '../models/posts.model'
import { truncate } from '../utils/truncate'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpClient = inject(HttpClient)
  private base_url = 'http://localhost:3000/api/v1'
  isLoading = signal<boolean>(false)

  allPosts() {
    return this.get('/posts').pipe(
      map((response) => response.posts),
      catchError((error) => {
        console.error('Error fetching posts', error)
        return of([])
      })
    )
  }

  searchPosts(query: string) {
    this.isLoading.set(true)

    return this.post(`/search_posts?q[title_or_body_or_tags_cont]=${query}`, {}, {}).pipe(
      map((response) => {
        return response.posts.map((post: IPost) => {
          const index = post.body.toLowerCase().indexOf(query.toLowerCase())
          post.body = truncate(post.body, index, 40)

          if (typeof post.tags === 'string') {
            post.tags = post.tags.split(',')
          }

          return post
        })
      }),
      tap(() => this.isLoading.set(false)),
      catchError((error) => {
        this.isLoading.set(false)
        return of([])
      })
    )
  }

  private get(endpoint: string): Observable<IPosts> {
    return this.httpClient.get<IPosts>(`${this.base_url}${endpoint}`)
  }

  private post(endpoint: string, header: {}, body: {}): Observable<IPosts> {
    const headers = new HttpHeaders(header)

    return this.httpClient.post<IPosts>(`${this.base_url}${endpoint}`, body, { headers: headers })
  }
}
