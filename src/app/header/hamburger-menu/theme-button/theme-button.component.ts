import { Component, computed, inject, input } from '@angular/core'
import { NgClass } from '@angular/common'
import { ThemeManagerService } from '../../../services/theme-manager.service'


@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.css',
})
export class ThemeButtonComponent {
  private themeManagerService = inject(ThemeManagerService)
  icon = input.required<string>()
  name = input.required<string>()
  theme = this.themeManagerService.actualTheme
  isActive = computed(() => {
    return this.theme() === this.name()
  })
}
