import { Component, inject, computed } from '@angular/core'
import { ThemeManagerService } from '../services/theme-manager.service'
import { MenuComponent } from './menu/menu.component'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MenuComponent],
})
export class HeaderComponent {
  private themeManagerService = inject(ThemeManagerService)

  logoImage = computed(() => {
    if (['Light', 'System'].includes(this.themeManagerService.actualTheme())) {
      return '/images/rails-genius-logo.png'
    } else {
      return '/images/rails-genius-logo-dark.png'
    }
  })
}
