import { Component, inject, OnInit, signal } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { LocalstorageService } from './services/localstorage.service'
import { ThemeManagerService } from './services/theme-manager.service'
import { HttpClient } from '@angular/common/http'
import { ISinglePost } from './models/single-post.model'
import { delay, Observable, tap } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { PostService } from './services/post.service'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './components/home/home.component'
import { SkeletonComponent } from './components/home/skeleton/skeleton.component'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, AsyncPipe, HeaderComponent, HomeComponent, SkeletonComponent, RouterOutlet, FooterComponent],
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
