import { Component, inject, OnInit, signal } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { LocalstorageService } from './services/localstorage.service'
import { ThemeManagerService } from './services/theme-manager.service'
import { AsyncPipe, NgIf } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './components/home/home.component'
import { SkeletonComponent } from './components/home/skeleton/skeleton.component'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'
import { AuthenticatorService } from './services/authenticator.service'
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    HeaderComponent,
    HomeComponent,
    SkeletonComponent,
    RouterOutlet,
    FooterComponent,
    EditorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount codesample',
    toolbar:
      'undo redo | formatselect | bold italic underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | link image code codesample',
  }
  private primengConfig = inject(PrimeNGConfig)
  private localStorageService = inject(LocalstorageService)
  private themeManagerService = inject(ThemeManagerService)
  private authenticatorService = inject(AuthenticatorService)

  ngOnInit(): void {
    this.primengConfig.ripple = true
    this.localStorageService.checkLocalStorage()
    this.themeManagerService.switchTheme(this.localStorageService.actualData().theme)
    this.authenticate()
  }

  authenticate() {
    this.authenticatorService.validate_session().subscribe()
  }
}
