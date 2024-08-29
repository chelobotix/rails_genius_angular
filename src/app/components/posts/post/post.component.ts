import { Component } from '@angular/core'
import { QuillEditorComponent } from 'ngx-quill'
import { EditorModule } from 'primeng/editor'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [QuillEditorComponent, EditorModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  content = ''

  logContent() {
    console.log(this.content)
  }
}
