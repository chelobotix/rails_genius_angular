import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute)
  email: string | null = null

  ngOnInit(): void {
    this.email = this.activateRoute.snapshot.queryParamMap.get('email')
    if (typeof this.email === 'string') {
      this.email = this.email.substring(0, this.email.indexOf('@'))
    }
  }
}
