import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core'
import { Button } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { debounceTime, Observable, of, Subscription, tap } from 'rxjs'
import { AsyncPipe, NgIf } from '@angular/common'
import { ListboxModule } from 'primeng/listbox'
import { PostService } from '../../../services/post.service'
import { BoldTargetPipe } from '../../../pipes/bold-target.pipe'
import { RouterLink } from '@angular/router'
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
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef
  private postService = inject(PostService)
  private subscription!: Subscription
  searchPosts = this.postService.actualSearchedPosts
  visible: boolean = false
  searchTerm: string = ''
  isSearching = signal<boolean>(false)

  formData = new FormGroup({
    search: new FormControl<any>('', {}),
  })

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      this.visible = true
    }

    if (event.key === 'Escape' && this.visible) {
      this.visible = false
    }
  }

  ngOnInit(): void {
    this.subscription = this.formData.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        tap((value: string) => {
          this.searchTerm = value
          this.handleSearch(value)
        })
      )
      .subscribe()
  }

  ngAfterViewChecked(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus()
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  showDialog() {
    this.visible = true
  }

  handleSearch(value: string) {
    if (value !== '') {
      this.isSearching.set(true)
      this.subscription = this.postService
        .searchPosts(value)
        .pipe(tap((posts) => this.isSearching.set(false)))
        .subscribe()
    } else {
      this.postService.empty_searchedPosts()
    }
  }

  handleDialogShow() {
    this.searchInput.nativeElement.value = ''
  }

  protected readonly random = random
}
