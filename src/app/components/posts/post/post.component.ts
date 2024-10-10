import { AfterViewChecked, Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../../../services/post.service'
import { IPost } from '../../../models/post.model'
import { LoaderService } from '../../../services/loader.service'
import { AvatarModule } from 'primeng/avatar'
import { MarkdownModule } from 'ngx-markdown'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { FavoriteService } from '../../../services/favorite.service'
import { catchError, concatMap, map, of, switchMap } from 'rxjs'

declare var lightbox: any

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarModule, MarkdownModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private postService = inject(PostService)
  private authenticatorService = inject(AuthenticatorService)
  private loaderService = inject(LoaderService)
  private favoriteService = inject(FavoriteService)

  postId: string | null = null
  post = signal<IPost | null>(null)
  loader = this.loaderService.loadingState
  favorite = signal(false)

  ngOnInit() {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      fitImagesInViewport: false,
      disableScrolling: true,
    })

    // this.loaderService.hideLoader()
    this.loaderService.showLoader()
    this.postId = this.route.snapshot.paramMap.get('id')

    if (this.postId) {
      this.postService
        .getPost(this.postId)
        .pipe(
          concatMap((response) => {
            this.post.set(response.post)
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
}
