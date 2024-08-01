import { Injectable, signal } from '@angular/core'
import { Theme } from '../models/theme.model'

@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private theme = signal<Theme>('Light')
  actualTheme = this.theme.asReadonly()

  change(theme: Theme): void {
    this.theme.set(theme)
  }
}
