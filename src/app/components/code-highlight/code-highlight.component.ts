import { Component, inject, Input, OnInit, signal } from '@angular/core'
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers'
import { HttpClient } from '@angular/common/http'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-code-highlight',
  standalone: true,
  imports: [Highlight, HighlightLineNumbers, NgIf],
  templateUrl: './code-highlight.component.html',
  styleUrl: './code-highlight.component.scss'
})
export class CodeHighlightComponent implements OnInit{
  @Input({required: true}) fileName!:string
  @Input({required: true}) gistId!:string

  private httpClient = inject(HttpClient);
  codeSnippet = signal<string | null>(null);
  language = ''
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadGistContent()
  }

  private loadGistContent(): void {
    const gistUrl = `https://api.github.com/gists/${this.gistId}`;

    this.httpClient.get<any>(gistUrl).subscribe({
      next: (response) => {
        const file = response.files[this.fileName];
        if (file) {
          this.codeSnippet.set(file.content); // Establece el contenido del archivo
        console.log(this.codeSnippet())
          this.language = file.language.toLowerCase(); // Idioma del archivo
        } else {
          this.errorMessage = `Archivo "${this.fileName}" no encontrado en el Gist.`;
        }
      },
      error: (error) => {
        console.error('Error cargando el Gist:', error);
        this.errorMessage = 'No se pudo cargar el contenido del Gist.';
      },
    });
  }



}
