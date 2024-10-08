import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { Button } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { PaginatorModule } from 'primeng/paginator'
import { PanelModule } from 'primeng/panel'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { catchError, finalize, of, tap } from 'rxjs'
import { CommentService } from '../../../../../services/comment.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [Button, FloatLabelModule, InputTextareaModule, PaginatorModule, PanelModule, ReactiveFormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.scss',
})
export class EditCommentComponent implements OnInit {
  @Input({ required: true }) commentId!: number
  @Input({ required: true }) commentPostId!: number
  @Input({ required: true }) commentBody!: string
  @Output() showEdit = new EventEmitter<void>()

  private commentService = inject(CommentService)

  constructor(private toastr: ToastrService) {}

  formData = new FormGroup({
    body: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  ngOnInit(): void {
    this.formData.patchValue({
      body: this.commentBody,
    })
  }

  onSubmit() {
    console.log(this.formData.value.body)
    console.log(this.commentId)
    if (this.formData.valid) {
      this.commentService
        .edit(this.formData.value.body!, this.commentPostId, this.commentId)
        .pipe(
          tap((response) => {
            console.log(response)
            this.toastr.success('updated, pending of moderation!')
          }),
          catchError((error) => {
            console.log(error)
            this.toastr.error('Not updated')
            return of([])
          }),
          finalize(() => {
            this.showEdit.emit()
          })
        )
        .subscribe()
    }
  }
}
