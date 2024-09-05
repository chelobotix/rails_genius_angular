import { Component, inject, SecurityContext } from '@angular/core'
import { EditorModule } from 'primeng/editor'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { QuillEditorComponent } from 'ngx-quill'
import { DomSanitizer } from '@angular/platform-browser'
import { PostService } from '../../../services/post.service'
import { InputTextModule } from 'primeng/inputtext'
import { CheckboxModule } from 'primeng/checkbox'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ChipsModule } from 'primeng/chips'
import { NgIf } from '@angular/common'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { EditorComponent } from '@tinymce/tinymce-angular'

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    QuillEditorComponent,
    InputTextModule,
    ReactiveFormsModule,
    CheckboxModule,
    FloatLabelModule,
    ChipsModule,
    NgIf,
    EditorComponent,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  private sanitizer = inject(DomSanitizer)
  private postService = inject(PostService)
  private authenticatorService = inject(AuthenticatorService)

  init: EditorComponent['init'] = {
    height: 1500,
    weight: 1500,
    resize: true,
    plugins: 'lists link image table code help wordcount codesample',
    toolbar:
      'undo redo | formatselect | bold italic underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | link image code codesample',
  }

  imagePreview: string | ArrayBuffer | null = null

  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    tags: new FormControl('', { validators: [Validators.required] }),
    editorContent: new FormControl('', { validators: [Validators.required] }),
    featured: new FormControl('', { validators: [Validators.required] }),
    published: new FormControl('', { validators: [Validators.required] }),
    image: new FormControl<File | null>(null, { validators: [Validators.required] }),
  })

  onSubmit() {
    console.log(this.form.value)
    const formData = new FormData()

    if (this.form.valid && this.authenticatorService.actualIsAuthenticated()) {
      const sanitizedTitle = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.title as string)
      const sanitizedTags = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.tags as string)
      const sanitizedEditor = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.editorContent as string)

      formData.append('post[title]', this.form.value.title as string)
      formData.append('post[tags]', this.form.value.tags as string)
      formData.append('post[body]', this.form.value.editorContent as string)
      formData.append('post[featured]', this.form.value.featured ? 'true' : 'false')
      formData.append('post[published]', this.form.value.published ? 'true' : 'false')

      if (this.form.value.image && this.form.value.image instanceof File) {
        formData.append('post[image]', this.form.value.image, this.form.value.image.name)
      }

      this.postService.newPost(formData).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        },
      })
    } else {
      console.log('nola')
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    if (file) {
      this.form.patchValue({
        image: file,
      })
      // Opcional: si quieres mostrar una vista previa de la imagen
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
