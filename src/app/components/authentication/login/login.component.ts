import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core'
import { Button } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { Message, PrimeTemplate } from 'primeng/api'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Subscription, tap } from 'rxjs'
import { MessagesModule } from 'primeng/messages'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { types } from 'node:util'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Button,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    PrimeTemplate,
    ReactiveFormsModule,
    RouterLink,
    MessagesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute)
  private authenticatorService = inject(AuthenticatorService)
  private subscription!: Subscription
  private router = inject(Router)
  confirmation = signal(false)
  message: Message[] = [{ severity: 'success', detail: 'Email confirmed, please Login.' }]
  loading = signal(false)
  errors = signal('')

  formData = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  ngOnInit(): void {
    this.checkQueryParams()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit() {
    if (this.formData.value.email && this.formData.value.password) {
      this.loading.set(true)
      this.subscription = this.authenticatorService
        .login(this.formData.value.email, this.formData.value.password)
        .subscribe({
          next: (response) => {
            if (response.status == 200) {
              this.loading.set(false)
              const authHeader = response.headers
              if (authHeader) {
                this.authenticatorService.set_credentials(authHeader)
              }

              this.router.navigate(['/'])
            }
          },
          error: (err) => {
            this.loading.set(false)
            this.errors.set(err['error']['errors'])
          },
        })
    }
  }

  checkQueryParams() {
    this.subscription = this.activatedRoute.queryParams.subscribe((res) => {
      if (res['account_confirmation_success'] === 'true') {
        this.confirmation.set(true)
      }
    })
  }

  clearForm() {
    this.formData.reset()
  }
}
