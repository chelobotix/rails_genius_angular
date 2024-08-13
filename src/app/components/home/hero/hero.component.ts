import { Component, inject, OnInit, signal } from '@angular/core'
import { PostService } from '../../../services/post.service'
import { delay, Observable, of, Subscription, tap } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { ISinglePost } from '../../../models/single-post.model'
import { SkeletonModule } from 'primeng/skeleton'
import { LoaderService } from '../../../services/loader.service'

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AsyncPipe, NgIf, SkeletonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  postService = inject(PostService)
  loaderService = inject(LoaderService)
  heroPost = signal<ISinglePost | undefined>(undefined)
  private subscription!: Subscription

  ngOnInit(): void {
    this.loaderService.showLoader()
    this.subscription = this.postService
      .lastPost()
      .pipe(
        delay(3000),
        tap((data) => {
          this.heroPost.set(data)
          this.loaderService.hideLoader()
        })
      )
      .subscribe()
  }
}
