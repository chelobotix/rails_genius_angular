import { Component, Input } from '@angular/core'
import { IPost } from '../../../models/post.model'
import { ActivatedRoute, RouterLink } from '@angular/router'

@Component({
  selector: 'app-post-holder',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-holder.component.html',
  styleUrl: './post-holder.component.scss',
})
export class PostHolderComponent {
  @Input({ required: true }) post!: IPost
}
