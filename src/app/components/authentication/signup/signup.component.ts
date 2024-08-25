import { Component, inject, signal } from '@angular/core'
import { CardModule } from 'primeng/card'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Button } from 'primeng/button'
import { RouterLink, Router } from '@angular/router'
import { Subscription, tap } from 'rxjs'
import { AuthenticatorService } from '../../../services/authenticator.service'
import { NgClass } from '@angular/common'
import { CheckComponent } from '../../check/check.component'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    Button,
    CardModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    CheckComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authenticatorService = inject(AuthenticatorService)
  private router = inject(Router)
  private subscription!: Subscription
  loading = signal(false)
  errors = signal('')
  formData = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    }),
  })

  onSubmit() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched()
      return
    }

    if (this.formData.value.email && this.formData.value.password) {
      this.loading.set(true)
      this.subscription = this.authenticatorService
        .signup(this.formData.value.email, this.formData.value.password)
        .pipe(tap((response) => console.log(response)))
        .subscribe({
          next: (response) => {
            console.log(response)
            if (response.status == 200) {
              this.loading.set(false)
              this.router.navigate(['auth/success'], {
                queryParams: { email: this.formData.value.email },
                replaceUrl: true,
              })
            }
          },
          error: (err) => {
            this.loading.set(false)
            this.errors.set(err.error.errors.full_messages)
          },
        })
    }
  }

  validateField(field: string) {
    return this.formData.get(field)?.dirty && this.formData.get(field)?.valid
  }

  clearForm() {
    this.formData.reset()
  }
}
