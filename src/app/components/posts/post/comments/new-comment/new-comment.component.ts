import {Component, inject, Input} from '@angular/core'
import {Button} from 'primeng/button'
import {FloatLabelModule} from 'primeng/floatlabel'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {PanelModule} from 'primeng/panel'
import {CommentService} from '../../../../../services/comment.service'
import {tap} from "rxjs";

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [Button, FloatLabelModule, InputTextareaModule, ReactiveFormsModule, PanelModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss',
})
export class NewCommentComponent {
  @Input({required: true}) post_id!: number

  private commentService = inject(CommentService)

  formData = new FormGroup({
    body: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  onSubmit() {
    console.log(this.formData.value.body)
    if (this.formData.valid) {
      this.commentService.new(this.formData.value.body!, this.post_id).pipe(
        tap((response) => {
          console.log(response)
        })
      ).subscribe()

    }
  }

  new_comment() {
  }
}
