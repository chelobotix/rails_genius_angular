import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { MenuService } from '../header/menu/menu.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('homeContainer') homeContainer!: ElementRef
  private renderer = inject(Renderer2)
  private menuService = inject(MenuService)
  private subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.menuService.clickEvent$.subscribe(() => {
      this.handleHomeContainer()
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  handleHomeContainer() {
    const hasClass =
      this.homeContainer.nativeElement.classList.contains('menu-over')
    if (hasClass) {
      this.renderer.removeClass(this.homeContainer.nativeElement, 'menu-over')
    } else {
      this.renderer.addClass(this.homeContainer.nativeElement, 'menu-over')
    }
  }
}
