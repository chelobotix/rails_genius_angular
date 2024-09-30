import { inject, Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safeHtmlPipe',
  standalone: true,
})
export class SafeHtmlPipePipe implements PipeTransform {
  sanitizer = inject(DomSanitizer)

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
