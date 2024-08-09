import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  apiCount = 0
  private isLoading = signal<boolean>(false)
  loaderState = this.isLoading.asReadonly()

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoading.set(true)
    }
    this.apiCount++
  }

  hideLoader() {
    this.apiCount--
    if (this.apiCount === 0) {
      this.isLoading.set(false)
    }
  }
}
