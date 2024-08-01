import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core'
import { MenubarModule } from 'primeng/menubar'
import { BadgeModule } from 'primeng/badge'
import { NgClass, NgIf } from '@angular/common'
import { Ripple } from 'primeng/ripple'
import { AvatarModule } from 'primeng/avatar'
import { InputTextModule } from 'primeng/inputtext'
import { Button } from 'primeng/button'

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout'
import { MenuComponent } from './menu/menu.component'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    MenubarModule,
    BadgeModule,
    NgClass,
    Ripple,
    NgIf,
    AvatarModule,
    InputTextModule,
    Button,
    MenuComponent,
  ],
})
export class HeaderComponent implements OnInit {
  items: any[] | undefined
  @ViewChild('contentContainer') contentContainer!: ElementRef
  private breakpointObserver = inject(BreakpointObserver)

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Matches small viewport or handset in portrait mode')
        }
      })

    this.items = [
      {
        label: 'Archive',
      },
      {
        label: 'About',
      },
      {
        label: 'Login',
      },
      {
        label: 'Sign up',
      },
    ]
  }

  onMenuClick() {
    const hasClass =
      this.contentContainer.nativeElement.classList.contains('test')
    if (hasClass) {
      this.renderer.removeClass(this.contentContainer.nativeElement, 'test')
    } else {
      this.renderer.addClass(this.contentContainer.nativeElement, 'test')
    }
  }
}
