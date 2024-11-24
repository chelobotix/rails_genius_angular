import { Component, inject, OnInit, signal, ViewContainerRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../../../services/post.service'
import { IPost } from '../../../models/post.model'
import { LoaderService } from '../../../services/loader.service'
import { AvatarModule } from 'primeng/avatar'
import { MarkdownModule } from 'ngx-markdown'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { FavoriteService } from '../../../services/favorite.service'
import { concatMap, map, of } from 'rxjs'
import { CommentsComponent } from './comments/comments.component'
import { Button } from 'primeng/button'
import { NewCommentComponent } from './comments/new-comment/new-comment.component'
import { CookiesCasosDeLaVidaRealComponent } from './2024/espanol/cookies-casos-de-la-vida-real/cookies-casos-de-la-vida-real.component'
import { CommonModule } from '@angular/common'
import { NotFoundComponent } from '../../not-found/not-found.component'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarModule, MarkdownModule, CommentsComponent, Button, NewCommentComponent, CommonModule],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.scss',
})
export class PostContentComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private postService = inject(PostService)
  private authenticatorService = inject(AuthenticatorService)
  private loaderService = inject(LoaderService)
  private favoriteService = inject(FavoriteService)

  postId: string | null = null
  post = signal<IPost | null>(null)
  loader = this.loaderService.loadingState
  favorite = signal(false)
  isAuthenticated = this.authenticatorService.actualIsAuthenticated
  currentComponent: any

  ngOnInit() {
    this.loaderService.showLoader()
    this.postId = this.route.snapshot.paramMap.get('id')

    if (this.postId) {
      this.postService
        .getPost(this.postId)
        .pipe(
          concatMap((response) => {
            console.log(response)
            this.post.set(response.post)
            if (this.post()) {
              this.mapPost(this.post()?.identifier!)
            }
            if (this.authenticatorService.actualIsAuthenticated()) {
              return this.favoriteService.check(response.post.id).pipe(
                map((response) => {
                  this.favorite.set(response.favorite)
                })
              )
            }
            return of([])
          })
        )
        .subscribe()
    }
  }

  toggleFavorite(state: boolean) {
    if (this.post()?.id) {
      this.favoriteService.toggle(this.post()!.id).subscribe({
        next: () => {
          this.favorite.set(!this.favorite())
        },
      })
    }
  }

  mapPost(identifier: string) {
    console.log(identifier)
    const componentMap: { [key: string]: any } = {
      cookies_casos_de_la_vida_real: CookiesCasosDeLaVidaRealComponent,
    }

    this.currentComponent = componentMap[identifier] || NotFoundComponent
  }
}
