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

  colors = [
    { 'background-color': '#FF5733', color: '#FFFFFF' },
    { 'background-color': '#33FF57', color: '#000000' },
    { 'background-color': '#3357FF', color: '#FFFFFF' },
    { 'background-color': '#FF33A1', color: '#FFFFFF' },
    { 'background-color': '#FFD700', color: '#000000' },
    { 'background-color': '#8E44AD', color: '#FFFFFF' },
  ]

  ngOnInit(): void {
    console.log(this.comments)
  }

  avatar_color() {
    const colors = [
      { 'background-color': '#FF5733', color: '#FFFFFF' },
      { 'background-color': '#33FF57', color: '#000000' },
      { 'background-color': '#3357FF', color: '#FFFFFF' },
      { 'background-color': '#FF33A1', color: '#FFFFFF' },
      { 'background-color': '#FFD700', color: '#000000' },
      { 'background-color': '#8E44AD', color: '#FFFFFF' },
    ]

    return colors[Math.floor(Math.random() * colors.length)]
  }
}
