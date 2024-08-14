import { Component, inject, Input, input, OnInit, signal } from '@angular/core'
import { PostService } from '../../../services/post.service'
import { delay, Observable, of, Subscription, tap } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { ISinglePost } from '../../../models/single-post.model'
import { SkeletonModule } from 'primeng/skeleton'
import { LoaderService } from '../../../services/loader.service'
import { IPost } from '../../../models/post.model'

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AsyncPipe, NgIf, SkeletonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  @Input({ required: true }) heroPost!: IPost
  image = signal('')

  ngOnInit(): void {
    const id = this.heroPost.id
    this.image.set(`/images/posts/${id}/${id}_landscape.webp`)
  }
}
