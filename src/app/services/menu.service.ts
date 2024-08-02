import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private clickEvent = new Subject<void>()
  clickEvent$ = this.clickEvent.asObservable()

  emitClickEvent() {
    this.clickEvent.next()
  }
}
