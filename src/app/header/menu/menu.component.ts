import { Component, inject, output } from '@angular/core'
import { DividerModule } from 'primeng/divider'
import { Button } from 'primeng/button'
import { MenuService } from './menu.service'
import { ThemeButtonComponent } from './theme-button/theme-button.component'
import { ThemeManagerService } from '../../services/theme-manager.service'
import { Theme } from '../../models/theme.model'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DividerModule, Button, ThemeButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  private menuService = inject(MenuService)
  private themeManagerService = inject(ThemeManagerService)

  handleClick() {
    this.menuService.emitClickEvent()
  }

  themeChange(new_theme: Theme): void {
    this.themeManagerService.change(new_theme)
    console.log(this.themeManagerService.actualTheme())
  }
}
