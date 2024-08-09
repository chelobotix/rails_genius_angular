import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'boldTarget',
  standalone: true,
})
export class BoldTargetPipe implements PipeTransform {
  transform(value: string, keyword: string): string {
    let boldedText: string = value.replace(keyword, `<strong>${keyword}</strong>`)
    boldedText = boldedText.replace(keyword.toUpperCase(), `<strong>${keyword.toUpperCase()}</strong>`)
    boldedText = boldedText.replace(
      keyword.charAt(0).toUpperCase() + keyword.slice(1),
      `<strong>${keyword.charAt(0).toUpperCase() + keyword.slice(1)}</strong>`
    )
    return boldedText
  }
}
