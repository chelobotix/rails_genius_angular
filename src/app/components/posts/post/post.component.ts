import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../../../services/post.service'
import { IPost } from '../../../models/post.model'
import { catchError, filter, of, switchMap } from 'rxjs'
import { LoaderService } from '../../../services/loader.service'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
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
    this.loaderService.showLoader()
    this.postId = this.route.snapshot.paramMap.get('id')
    if (this.postId) {
      this.postService.getPost(this.postId).subscribe({
        next: (response) => {
          this.post.set(response)
          this.loaderService.hideLoader()
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }
}
