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
import { catchError, of, tap } from 'rxjs'
import { CommentService } from '../../../../services/comment.service'
import { ToastrService } from 'ngx-toastr'

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
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input({ required: true }) comments!: IComment[]

  private authenticatorService = inject(AuthenticatorService)
  private commentService = inject(CommentService)

  constructor(private toastr: ToastrService) {}

  user_uid = this.authenticatorService.actualCredentials().uid
  show_edit = signal(false)

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

  ngOnInit(): void {
    console.log(this.comments)
    console.log(this.user_uid)
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

  edit(commentBody: string) {
    this.formData.patchValue({
      body: commentBody,
    })
    this.show_edit.set(true)
  }

  onSubmit(commentId: number, postId: number) {
    console.log(this.formData.value.body)
    console.log(commentId)
    if (this.formData.valid) {
      this.commentService
        .edit(this.formData.value.body!, postId, commentId)
        .pipe(
          tap((response) => {
            console.log(response)
            this.toastr.success('updated, pending of moderation!')
            this.show_edit.set(false)
          }),
          catchError((error) => {
            console.log(error)
            this.toastr.error('Not updated')
            this.show_edit.set(false)
            return of([])
          })
        )
        .subscribe()
    }
  }
}
