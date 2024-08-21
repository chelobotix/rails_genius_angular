import { Injectable, signal } from '@angular/core'
import { ITheme } from '../models/theme.model'
import { ILocalStorage } from '../models/ILocalStorage.model'

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private data = signal<ILocalStorage>({
    theme: 'Light',
    token: '',
  })

  actualData = this.data.asReadonly()

  updateTheme(theme: ITheme): void {
    this.data.set({ ...this.data(), theme: theme })
    this.createData()
  }

  updateToken(token: string): void {
    this.data.set({ ...this.data(), token: token })
    this.createData()
  }

  checkLocalStorage() {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('rails_genius_data')
      if (result) {
        this.data.set(JSON.parse(result))
      } else {
        this.createData()
      }
    }
  }

  private createData() {
    if (typeof window !== 'undefined') {
      console.log(this.data())
      localStorage.setItem('rails_genius_data', JSON.stringify(this.data()))
    }
  }
}
