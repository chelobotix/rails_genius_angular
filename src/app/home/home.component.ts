import { Component, computed, inject } from '@angular/core'
import { MenuService } from '../services/menu.service'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private menuService = inject(MenuService)
  menuStatus = computed(() => {
    return this.menuService.actualStatus() == 'open'
  })
}
