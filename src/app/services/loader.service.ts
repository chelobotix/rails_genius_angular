import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  apiCount = 0
  private loading = signal<boolean>(false)
  loadingState = this.loading.asReadonly()

  showLoader() {
    this.apiCount++
    this.setLoading()
  }

  hideLoader() {
    this.apiCount--
    this.setLoading()
  }

  private setLoading() {
    this.loading.set(this.apiCount > 0)
  }
}
