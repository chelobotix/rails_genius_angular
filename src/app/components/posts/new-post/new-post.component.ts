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
import { InputTextareaModule } from 'primeng/inputtextarea'

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
    InputTextareaModule,
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
  thumbnailPreview: string | ArrayBuffer | null = null

  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.required] }),
    year: new FormControl('', { validators: [Validators.required] }),
    language: new FormControl('', { validators: [Validators.required] }),
    identifier: new FormControl('', { validators: [Validators.required] }),
    editorContent: new FormControl('', { validators: [Validators.required] }),
    tags: new FormControl('', { validators: [Validators.required] }),
    featured: new FormControl('', { validators: [Validators.required] }),
    published: new FormControl('', { validators: [Validators.required] }),
    image: new FormControl<File | null>(null, { validators: [Validators.required] }),
    thumbnail: new FormControl<File | null>(null, { validators: [Validators.required] }),
  })

  onSubmit() {
    const formData = new FormData()

    if (this.form.valid && this.authenticatorService.actualIsAuthenticated()) {
      const sanitizedTitle = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.title as string)
      const sanitizedDescription = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.description as string)
      const sanitizedYear = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.year as string)
      const sanitizedLanguage = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.language as string)
      const sanitizedIdentifier = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.identifier as string)
      const sanitizedTags = this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.tags as string)

      formData.append('post[title]', sanitizedTitle as string)
      formData.append('post[description]', sanitizedDescription as string)
      formData.append('post[year]', sanitizedYear as string)
      formData.append('post[language]', sanitizedLanguage as string)
      formData.append('post[identifier]', sanitizedIdentifier as string)
      formData.append('post[tags]', sanitizedTags as string)
      formData.append('post[body]', this.form.value.editorContent as string)
      formData.append('post[featured]', this.form.value.featured ? 'true' : 'false')
      formData.append('post[published]', this.form.value.published ? 'true' : 'false')

      if (this.form.value.image && this.form.value.image instanceof File) {
        formData.append('post[image]', this.form.value.image, this.form.value.image.name)
      }

      if (this.form.value.thumbnail && this.form.value.thumbnail instanceof File) {
        formData.append('post[thumbnail]', this.form.value.thumbnail, this.form.value.thumbnail.name)
      }

      this.postService.newPost(formData as FormData).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }

  // Configura para que con este metodo se vea el thubnail y la imagen
  onFileSelected(event: any, type: string): void {
    const file: File = event.target.files[0]
    if (file) {
      if (type === 'image') {
        this.form.patchValue({
          image: file,
        })
      } else if (type == 'thumbnail') {
        this.form.patchValue({
          thumbnail: file,
        })
      }

      // Opcional: si quieres mostrar una vista previa de la imagen
      const reader = new FileReader()
      reader.onload = (e: any) => {
        if (type == 'image') {
          this.imagePreview = e.target.result
        } else if (type == 'thumbnail') {
          this.thumbnailPreview = e.target.result
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
