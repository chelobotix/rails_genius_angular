import { AfterViewChecked, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core'
import { Button } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { Observable, of } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { ListboxModule } from 'primeng/listbox'
import { PostService } from '../../../services/post.service'
import { BoldTargetPipe } from '../../../pipes/bold-target.pipe'
import { IPost } from '../../../models/post.model'
import { indexOf, random } from 'lodash'
import { ChipModule } from 'primeng/chip'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FormsModule,
    ProgressSpinnerModule,
    AsyncPipe,
    ListboxModule,
    BoldTargetPipe,
    NgIf,
    ChipModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements AfterViewChecked {
  postService = inject(PostService)
  posts$: Observable<IPost[]> = of([])
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>
  visible: boolean = false
  searchData: string = ''

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

  protected readonly indexOf = indexOf
  protected readonly random = random
}
