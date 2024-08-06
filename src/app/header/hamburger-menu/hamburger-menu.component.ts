import { Component, inject } from '@angular/core'
import { DividerModule } from 'primeng/divider'
import { Button } from 'primeng/button'
import { MenuService } from '../../services/menu.service'
import { ThemeButtonComponent } from './theme-button/theme-button.component'
import { ThemeManagerService } from '../../services/theme-manager.service'
import { ITheme } from '../../models/theme.model'
import { SelectButtonModule } from 'primeng/selectbutton'
import { FormsModule } from '@angular/forms'
import { MenuModule } from 'primeng/menu'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { Ripple } from 'primeng/ripple'
import { NgIf } from '@angular/common'
import { ButtonGroupModule } from 'primeng/buttongroup'
import { SearchComponent } from '../search/search.component'

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [
    DividerModule,
    Button,
    ThemeButtonComponent,
    SelectButtonModule,
    FormsModule,
    MenuModule,
    ToggleButtonModule,
    Ripple,
    NgIf,
    ButtonGroupModule,
    SearchComponent,
  ],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css',
})
export class HamburgerMenuComponent {
  private menuService = inject(MenuService)
  private themeManagerService = inject(ThemeManagerService)
  items = [
    {
      label: 'Archive',
    },
    {
      label: 'About',
    },
  ]

  handleMenuStatus(status: 'open' | 'close') {
    status === 'open' ? this.menuService.open() : this.menuService.close()
  }

  onHide() {}

  themeChange(new_theme: ITheme): void {
    this.themeManagerService.switchTheme(new_theme)
    console.log(this.themeManagerService.actualTheme())
  }
}
