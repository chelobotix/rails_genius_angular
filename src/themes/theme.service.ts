import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: string = 'aura-light-cyan';
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(): void {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (this.theme === 'aura-light-cyan') {
      this.theme = 'aura-dark-cyan';
      themeLink.href = 'aura-dark-cyan' + '.css';
      return;
    }
    themeLink.href = 'aura-light-cyan' + '.css';
    this.theme = 'aura-light-cyan';
  }
}
