import { Component, computed, inject } from '@angular/core'
import { MenuService } from '../../services/menu.service'
import { NgClass } from '@angular/common'
import { HeroComponent } from './hero/hero.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private menuService = inject(MenuService)
  menuStatus = computed(() => {
    return this.menuService.actualStatus() == 'open'
  })
}
