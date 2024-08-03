import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuStatus = signal<'open' | 'close'>('close')
  actualStatus = this.menuStatus.asReadonly()

  open() {
    this.menuStatus.set('open')
  }

  close() {
    this.menuStatus.set('close')
  }
}
