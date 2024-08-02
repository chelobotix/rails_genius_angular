import {inject, Injectable, signal} from '@angular/core'
import {ITheme} from '../models/theme.model'
import {DOCUMENT} from "@angular/common";
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private localStorageService = inject(LocalstorageService)
  private theme_type = signal<ITheme>('Light')
  public theme: string = 'aura-light-cyan';
  private document: Document = inject(DOCUMENT);
  actualTheme = this.theme_type.asReadonly()

  switchTheme(new_theme: ITheme): void {
    if (this.theme_type() !== new_theme) {
      if (new_theme === 'Dark') {
        this.handleChange('Dark', 'aura-dark-cyan')
      } else if (new_theme === 'Light') {
        this.handleChange('Light', 'aura-light-cyan')
      } else if (new_theme === "System") {
        this.isDark() ? this.handleChange('System', 'aura-dark-cyan') : this.handleChange('System', 'aura-light-cyan')
      }
    }
  }


  private handleChange(name: ITheme, theme: string): void {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    this.theme_type.set(name)
    this.theme = theme;
    themeLink.href = theme + '.css';
    this.localStorageService.updateTheme(name)
  }

  private isDark(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}
