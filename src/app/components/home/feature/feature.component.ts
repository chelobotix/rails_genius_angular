import { Component, Input } from '@angular/core'
import { IPost } from '../../../models/post.model'

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
})
export class FeatureComponent {
  @Input({ required: true }) featurePost!: IPost
}
