import { Injectable, signal } from '@angular/core'
import { ILocalStorage } from '../models/localstorage.model'
import { ITheme } from '../models/theme.model'

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private data = signal<ILocalStorage>({ theme: 'Light' })
  actualData = this.data.asReadonly()

  updateTheme(theme: ITheme): void {
    this.data.update((prev: ILocalStorage) => ({ ...prev, theme }))
    this.save()
  }

  exists() {
    let value = undefined
    if (typeof window !== 'undefined') {
      value = localStorage.getItem('rails_genius')
    }
    if (value) {
      this.get(value)
    } else {
      this.save()
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rails_genius', JSON.stringify(this.data()))
    }
  }

  private get(value: string) {
    const result: ILocalStorage = JSON.parse(value)
    this.data.set(result)
  }
}
