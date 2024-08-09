import { AfterViewChecked, Component, ElementRef, inject, ViewChild } from '@angular/core'
import { Button } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { Observable, of } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { ListboxModule } from 'primeng/listbox'
import { PostService } from '../../../services/post.service'
import { BoldTargetPipe } from '../../../pipes/bold-target.pipe'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [Button, DialogModule, FormsModule, ProgressSpinnerModule, AsyncPipe, ListboxModule, BoldTargetPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements AfterViewChecked {
  postService = inject(PostService)
  posts$: Observable<any> | undefined
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>
  visible: boolean = false
  searchData: string = ''
  isLoading = false

  ngAfterViewChecked(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus()
    }
  }

  showDialog() {
    this.visible = true
  }

  handleSearch() {
    if (this.searchData !== '') {
      if (this.searchData.length > 2) {
        this.posts$ = this.postService.searchPosts(this.searchData)
      }
    } else {
      this.posts$ = of([])
    }
  }
}
