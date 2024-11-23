import { Component, Input } from '@angular/core'
import { Highlight } from 'ngx-highlightjs'
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-code-highlight',
  standalone: true,
  imports: [Highlight, HighlightLineNumbers, NgIf],
  templateUrl: './code-highlight.component.html',
  styleUrl: './code-highlight.component.scss',
})
export class CodeHighlightComponent {
  @Input({ required: true }) code!: string
  @Input({ required: true }) language!: string
}
