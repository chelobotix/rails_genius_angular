import { Component } from '@angular/core'
import { Button } from 'primeng/button'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [Button],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {}
