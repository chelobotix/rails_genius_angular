import { AfterViewChecked, Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../../../services/post.service'
import { IPost } from '../../../models/post.model'
import { LoaderService } from '../../../services/loader.service'
import { AvatarModule } from 'primeng/avatar'
import { MarkdownModule } from 'ngx-markdown'

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
  private loaderService = inject(LoaderService)

  postId: string | null = null
  post = signal<IPost | null>(null)
  loader = this.loaderService.loadingState

  ngOnInit() {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      fitImagesInViewport: false,
      disableScrolling: true,
    })
    this.loaderService.showLoader()
    this.postId = this.route.snapshot.paramMap.get('id')
    if (this.postId) {
      this.postService.getPost(this.postId).subscribe({
        next: (response) => {
          this.post.set(response.post)
          this.loaderService.hideLoader()
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }
}
