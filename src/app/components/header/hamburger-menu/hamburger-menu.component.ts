import { Component, inject } from '@angular/core'
import { DividerModule } from 'primeng/divider'
import { Button, ButtonDirective } from 'primeng/button'
import { ThemeButtonComponent } from './theme-button/theme-button.component'
import { SelectButtonModule } from 'primeng/selectbutton'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MenuModule } from 'primeng/menu'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { Ripple } from 'primeng/ripple'
import { NgIf } from '@angular/common'
import { ButtonGroupModule } from 'primeng/buttongroup'
import { SearchComponent } from '../search/search.component'
import { MenuService } from '../../../services/menu.service'
import { ITheme } from '../../../models/theme.model'
import { ThemeManagerService } from '../../../services/theme-manager.service'
import { SidebarModule } from 'primeng/sidebar'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { InputGroupModule } from 'primeng/inputgroup'
import { AvatarModule } from 'primeng/avatar'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { Router } from '@angular/router'
import { Message } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import { MessagesModule } from 'primeng/messages'

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [
    DividerModule,
    Button,
    ThemeButtonComponent,
    SelectButtonModule,
    FormsModule,
    MenuModule,
    ToggleButtonModule,
    Ripple,
    NgIf,
    ButtonGroupModule,
    SearchComponent,
    SidebarModule,
    FloatLabelModule,
    InputTextModule,
    InputGroupModule,
    ButtonDirective,
    AvatarModule,
    DialogModule,
    MessagesModule,
    ReactiveFormsModule,
  ],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss',
})
export class HamburgerMenuComponent {
  private menuService = inject(MenuService)
  private themeManagerService = inject(ThemeManagerService)
  private authenticatorService = inject(AuthenticatorService)
  private router = inject(Router)

  is_authenticated = this.authenticatorService.actualIsAuthenticated
  credentials = this.authenticatorService.actualCredentials
  message: Message[] = []
  visible = false
  value = ''
  sidebarVisible: boolean = false

  items = [
    {
      label: 'Archive',
    },
    {
      label: 'About',
    },
  ]

  formData = new FormGroup({
    actualPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  handleMenuStatus(status: 'open' | 'close') {
    status === 'open' ? this.menuService.open() : this.menuService.close()
  }

  handleLogout() {
    this.authenticatorService.logout().subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  onSubmit() {
    console.log(this.formData.value.actualPassword)
    if (this.formData.value.newPassword) {
      this.authenticatorService.changePassword(this.formData.value.newPassword).subscribe({
        next: (response) => {
          console.log(response)
          this.message = [{ severity: 'success', detail: 'Password updated.' }]
          this.visible = false
        },
        error: (error) => {
          console.log(error)
          this.message = [{ severity: 'danger', detail: 'Password not matched.' }]
        },
      })
    }
  }

  showDialog() {
    this.sidebarVisible = false
    this.visible = true
  }

  authClick(uri: string) {
    this.sidebarVisible = false
    if (uri === 'signup') {
      this.router.navigate(['/auth/signup'])
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  themeChange(new_theme: ITheme): void {
    this.themeManagerService.switchTheme(new_theme)
    console.log(this.themeManagerService.actualTheme())
  }

  handleFavorites() {
    das
  }
}
