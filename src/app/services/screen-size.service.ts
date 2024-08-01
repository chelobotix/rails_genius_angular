import { Injectable } from '@angular/core'
import { debounceTime, fromEvent, map, Observable, startWith } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isSmallScreen$: Observable<boolean>

  constructor() {
    this.isSmallScreen$ = fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map(() => window.innerWidth < 961),
      startWith(window.innerWidth < 961),
    )
  }

  getIsSmallScreen(): Observable<boolean> {
    return this.isSmallScreen$
  }
}
