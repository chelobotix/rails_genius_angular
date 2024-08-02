import { Button } from 'primeng/button'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component'
import { PrimeNGConfig } from 'primeng/api'
import { LocalstorageService } from './services/localstorage.service'
import { SidebarModule } from 'primeng/sidebar'
import { MenuModule } from 'primeng/menu'
import { NgStyle } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, Button, SidebarModule, MenuModule, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig)
  private localStorageService = inject(LocalstorageService)

  ngOnInit(): void {
    this.primengConfig.ripple = true
    this.localStorageService.initialize()
  }
}
