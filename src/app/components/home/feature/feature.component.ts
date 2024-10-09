import { Component, Input } from '@angular/core'
import { IPost } from '../../../models/post.model'
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [TagModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
})
export class FeatureComponent {
  @Input({ required: true }) featurePost!: IPost
}
