import { Component, inject, OnInit } from '@angular/core'
import { Button } from 'primeng/button'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { ButtonGroupModule } from 'primeng/buttongroup'
import { DividerModule } from 'primeng/divider'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { IThemeSelect } from '../../../models/theme-select.model'
import { ThemeManagerService } from '../../../services/theme-manager.service'
import { SearchComponent } from '../search/search.component'

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    RouterLinkActive,
    ButtonGroupModule,
    DividerModule,
    FormsModule,
    DropdownModule,
    SearchComponent,
  ],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
})
export class DesktopMenuComponent implements OnInit {
  private themeManagerService = inject(ThemeManagerService)
  themes: IThemeSelect[] = [
    { name: 'Light', code: 'Light', icon: 'pi-sun' },
    { name: 'Dark', code: 'Dark', icon: 'pi-moon' },
    { name: 'System', code: 'System', icon: 'pi-desktop' },
  ]
  selectedTheme!: IThemeSelect

  handleTheme() {
    console.log(this.selectedTheme)
    this.themeManagerService.switchTheme(this.selectedTheme.code)
  }

  ngOnInit(): void {
    if (this.themeManagerService.actualTheme() === 'Light') {
      this.selectedTheme = this.themes[0]
    } else if (this.themeManagerService.actualTheme() === 'Dark') {
      this.selectedTheme = this.themes[1]
    } else if (this.themeManagerService.actualTheme() === 'System') {
      this.selectedTheme = this.themes[2]
    }
  }
}
