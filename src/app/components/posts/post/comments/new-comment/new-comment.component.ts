import { Component, inject, Input, OnInit, signal } from '@angular/core'
import { Button } from 'primeng/button'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { PanelModule } from 'primeng/panel'
import { CommentService } from '../../../../../services/comment.service'
import { tap } from 'rxjs'
import { AuthenticatorService } from '../../../../../services/authenticator.service'
import { ActivatedRoute, RouterLink } from '@angular/router'

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [Button, FloatLabelModule, InputTextareaModule, ReactiveFormsModule, PanelModule, RouterLink],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss',
})
export class NewCommentComponent implements OnInit {
  @Input({ required: true }) post_id!: number

  private authenticatorService = inject(AuthenticatorService)
  private commentService = inject(CommentService)

  commentDisable = signal(true)

  formData = new FormGroup({
    body: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  ngOnInit() {
    if (this.authenticatorService.actualIsAuthenticated()) {
      this.commentDisable.set(false)
    }
  }

  onSubmit() {
    console.log(this.formData.value.body)
    if (this.formData.valid) {
      this.commentService
        .new(this.formData.value.body!, this.post_id)
        .pipe(
          tap((response) => {
            console.log(response)
          })
        )
        .subscribe()
    }
  }
}
