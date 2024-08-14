import { Component, inject, Input } from '@angular/core'
import { PostService } from '../../services/post.service'
import { IPost } from '../../models/post.model'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true }) post!: IPost
}
