import { Component, inject, OnInit, signal } from '@angular/core'
import { CommentService } from '../../services/comment.service'
import { IComment } from '../../models/comment.model'
import { catchError, of, tap } from 'rxjs'
import { TableModule } from 'primeng/table'
import { Button } from 'primeng/button'

@Component({
  selector: 'app-moderate-comments',
  standalone: true,
  imports: [TableModule, Button],
  templateUrl: './moderate-comments.component.html',
  styleUrl: './moderate-comments.component.scss',
})
export class ModerateCommentsComponent implements OnInit {
  private commentService = inject(CommentService)

  comments = signal<IComment[]>([])

  ngOnInit(): void {
    this.commentService
      .pendingModeration()
      .pipe(
        tap((response) => {
          console.log(response)
          this.comments.set(response.comments)
        }),
        catchError((error) => {
          console.log(error)
          return of([])
        })
      )
      .subscribe()
  }

  handleComment(postId: number, commentId: number, status: string) {
    this.commentService
      .handleModeration(postId, commentId, status)
      .pipe(
        tap((response) => {
          console.log(response)
          this.comments.set(this.comments().filter((comment) => comment.id !== commentId))
        }),
        catchError((error) => {
          console.log(error)
          return of([])
        })
      )
      .subscribe()
  }
}
