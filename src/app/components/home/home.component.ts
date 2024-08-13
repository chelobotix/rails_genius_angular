import { Component, computed, inject, OnInit } from '@angular/core'
import { MenuService } from '../../services/menu.service'
import { NgClass } from '@angular/common'
import { HeroComponent } from './hero/hero.component'
import { PostService } from '../../services/post.service'
import { LoaderService } from '../../services/loader.service'
import { delay, Subscription, tap } from 'rxjs'
import { IPosts } from '../../models/posts.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService)
  private loaderService = inject(LoaderService)
  private subscription!: Subscription
  loader = this.loaderService.loadingState
  posts = this.postService.actualPosts

  ngOnInit(): void {
    this.loaderService.showLoader()
    this.subscription = this.postService
      .getPosts()
      .pipe(
        delay(500),
        tap((data) => {
          this.loaderService.hideLoader()
        })
      )
      .subscribe()
  }
}
