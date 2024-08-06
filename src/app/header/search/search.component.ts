import { Component } from '@angular/core'
import { Button } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms'
import { posts } from './posts'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [Button, DialogModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  visible: boolean = false
  searchData: string = ''

  showDialog() {
    this.visible = true
  }

  handleSearch() {
    console.log('s')
  }

  protected readonly posts = posts
}
