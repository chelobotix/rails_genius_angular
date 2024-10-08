import { Component, Input } from '@angular/core'
import { IPost } from '../../../models/post.model'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { DividerModule } from 'primeng/divider'

@Component({
  selector: 'app-post-holder',
  standalone: true,
  imports: [RouterLink, DividerModule],
  templateUrl: './post-holder.component.html',
  styleUrl: './post-holder.component.scss',
})
export class PostHolderComponent {
  @Input({ required: true }) post!: IPost
}
