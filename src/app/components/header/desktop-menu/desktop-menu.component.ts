import { Component, inject, OnInit, signal } from '@angular/core'
import { Button } from 'primeng/button'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { ButtonGroupModule } from 'primeng/buttongroup'
import { DividerModule } from 'primeng/divider'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { IThemeSelect } from '../../../models/theme-select.model'
import { ThemeManagerService } from '../../../services/theme-manager.service'
import { SearchComponent } from '../search/search.component'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { AvatarModule } from 'primeng/avatar'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabelModule } from 'primeng/floatlabel'
import { MessagesModule } from 'primeng/messages'
import { Message } from 'primeng/api'

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    RouterLinkActive,
    ButtonGroupModule,
    DividerModule,
    FormsModule,
    DropdownModule,
    SearchComponent,
    AvatarModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
})
export class DesktopMenuComponent implements OnInit {
  private themeManagerService = inject(ThemeManagerService)
  private authenticatorService = inject(AuthenticatorService)

  is_authenticated = this.authenticatorService.actualIsAuthenticated
  credentials = this.authenticatorService.actualCredentials
  message: Message[] = []
  visible = false

  formData = new FormGroup({
    actualPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

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

  onReset() {
    this.formData.reset()
  }

  themes: IThemeSelect[] = [
    { name: 'Light', code: 'Light', icon: 'pi-sun' },
    { name: 'Dark', code: 'Dark', icon: 'pi-moon' },
    { name: 'System', code: 'System', icon: 'pi-desktop' },
  ]
  selectedTheme!: IThemeSelect

  handleTheme() {
    this.themeManagerService.switchTheme(this.selectedTheme.code)
  }

  ngOnInit(): void {
    if (this.themeManagerService.actualTheme() === 'Light') {
      this.selectedTheme = this.themes[0]
    } else if (this.themeManagerService.actualTheme() === 'Dark') {
      this.selectedTheme = this.themes[1]
    } else if (this.themeManagerService.actualTheme() === 'System') {
      this.selectedTheme = this.themes[2]
    }
  }

  showDialog() {
    this.visible = true
  }
}
