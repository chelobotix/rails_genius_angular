import { Component, inject, OnInit } from '@angular/core'
import { NgClass } from '@angular/common'
import { HeroComponent } from './hero/hero.component'
import { PostService } from '../../services/post.service'
import { LoaderService } from '../../services/loader.service'
import { Subscription, tap } from 'rxjs'
import { FeatureComponent } from './feature/feature.component'
import { DividerModule } from 'primeng/divider'
import { PostHolderComponent } from './post-holder/post-holder.component'
import { PostContentComponent } from '../posts/post/post-content.component'
import { IPost } from '../../models/post.model'
import { RouterLink } from '@angular/router'
import { RomeComponent } from '../rome/rome.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    HeroComponent,
    FeatureComponent,
    PostContentComponent,
    DividerModule,
    PostHolderComponent,
    PostContentComponent,
    RouterLink,
    RomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService)
  private loaderService = inject(LoaderService)
  private subscription!: Subscription
  loader = this.loaderService.loadingState
  posts = this.postService.actualPosts
  featurePosts: IPost[] = []

  ngOnInit(): void {
    this.loaderService.showLoader()
    this.subscription = this.postService.getPosts().subscribe({
      next: (data) => {
        this.selectFeaturePosts()
        this.loaderService.hideLoader()
      },
    })
  }

  selectFeaturePosts() {
    let counter = 0
    let i = 0

    while (counter < 3 || i == this.posts().posts.length - 1) {
      if (this.posts().posts[i].featured) {
        this.featurePosts.push(this.posts().posts[i])
        i++
        counter++
        if (counter === this.posts().posts.length) {
          counter = 3
        }
      }
    }
  }
}
