import { Component, Input, OnInit } from '@angular/core'
import { TreeModule } from 'primeng/tree'
import { Button } from 'primeng/button'
import { PanelModule } from 'primeng/panel'
import { AvatarModule } from 'primeng/avatar'
import { IComment } from '../../../../models/comment.model'
import { TimeAgoPipe } from '../../../../pipes/time-ago.pipe'

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [TreeModule, Button, PanelModule, AvatarModule, TimeAgoPipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input({ required: true }) comments!: IComment[]

  ngOnInit(): void {}
}
