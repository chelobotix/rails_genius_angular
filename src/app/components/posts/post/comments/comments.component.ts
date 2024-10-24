import { Component, inject, Input, OnInit, signal } from '@angular/core'
import { TreeModule } from 'primeng/tree'
import { Button } from 'primeng/button'
import { PanelModule } from 'primeng/panel'
import { AvatarModule } from 'primeng/avatar'
import { IComment } from '../../../../models/comment.model'
import { TimeAgoPipe } from '../../../../pipes/time-ago.pipe'
import { AuthenticatorService } from '../../../../services/authenticator.service'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { catchError, finalize, of, tap } from 'rxjs'
import { CommentService } from '../../../../services/comment.service'
import { ToastrService } from 'ngx-toastr'
import { EditCommentComponent } from './edit-comment/edit-comment.component'
import { NewCommentComponent } from './new-comment/new-comment.component'

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    TreeModule,
    Button,
    PanelModule,
    AvatarModule,
    TimeAgoPipe,
    FloatLabelModule,
    InputTextareaModule,
    ReactiveFormsModule,
    EditCommentComponent,
    NewCommentComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input({ required: true }) post_id!: number

  @Input({ required: true }) set comments(value: IComment[]) {
    this.localComments.set(value)
  }

  constructor(private toastr: ToastrService) {}

  private authenticatorService = inject(AuthenticatorService)
  private commentService = inject(CommentService)

  localComments = signal<IComment[]>([])
  showEdit = signal(false)
  showReplyEdit = signal(false)
  showReplyToComment = signal(false)
  user_uid = this.authenticatorService.actualCredentials().uid
  actualOpen = 0
  actualReplyOpen = 0

  formData = new FormGroup({
    body: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  colors = [
    { 'background-color': '#FF5733', color: '#FFFFFF' },
    { 'background-color': '#33FF57', color: '#000000' },
    { 'background-color': '#3357FF', color: '#FFFFFF' },
    { 'background-color': '#FF33A1', color: '#FFFFFF' },
    { 'background-color': '#FFD700', color: '#000000' },
    { 'background-color': '#8E44AD', color: '#FFFFFF' },
  ]

  avatar_color() {
    const colors = [
      { 'background-color': '#FF5733', color: '#FFFFFF' },
      { 'background-color': '#29d547', color: '#000000' },
      { 'background-color': '#3357FF', color: '#FFFFFF' },
      { 'background-color': '#FF33A1', color: '#FFFFFF' },
      { 'background-color': '#FFD700', color: '#000000' },
      { 'background-color': '#8E44AD', color: '#FFFFFF' },
    ]

    return colors[Math.floor(Math.random() * colors.length)]
  }

  edit(commentId: number) {
    this.actualOpen = commentId
    this.showEdit.set(!this.showEdit())
  }

  editReply(replyId: number) {
    this.actualReplyOpen = replyId
    this.showReplyEdit.set(!this.showReplyEdit())
  }

  delete(commentId: number, commentPostId: number) {
    this.commentService
      .delete(commentPostId, commentId)
      .pipe(
        tap((response) => {
          this.localComments.set(this.localComments().filter((comment) => comment.id !== commentId))
          this.toastr.success('deleted!')
        }),
        catchError((error) => {
          console.log(error)
          this.toastr.error('Not deleted')
          return of([])
        })
      )
      .subscribe()
  }

  replyToComment() {
    this.showReplyToComment.set(!this.showReplyToComment())
  }
}
