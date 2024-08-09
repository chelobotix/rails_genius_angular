import { Button } from 'primeng/button'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { PrimeNGConfig } from 'primeng/api'
import { LocalstorageService } from './services/localstorage.service'
import { SidebarModule } from 'primeng/sidebar'
import { MenuModule } from 'primeng/menu'
import { NgStyle } from '@angular/common'
import { ThemeManagerService } from './services/theme-manager.service'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { SkeletonComponent } from './components/home/skeleton/skeleton.component'
import { SkeletonModule } from 'primeng/skeleton'
import { HeaderComponent } from './components/header/header.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    Button,
    SidebarModule,
    MenuModule,
    NgStyle,
    SpinnerComponent,
    SkeletonComponent,
    SkeletonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig)
  private localStorageService = inject(LocalstorageService)
  private themeManagerService = inject(ThemeManagerService)

  ngOnInit(): void {
    this.primengConfig.ripple = true
    this.localStorageService.exists()
    this.themeManagerService.switchTheme(this.localStorageService.actualData().theme)
  }
}
