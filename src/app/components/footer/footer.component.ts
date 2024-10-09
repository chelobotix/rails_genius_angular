import { Component } from '@angular/core'
import { Button } from 'primeng/button'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [Button],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
