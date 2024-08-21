import { Component, inject, OnInit } from '@angular/core'
import { Button } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { PrimeTemplate } from 'primeng/api'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Button, CardModule, FloatLabelModule, InputTextModule, PrimeTemplate, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  formData = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.formData.value.email)
  }

  clearForm() {
    this.formData.reset()
  }
}
