import { HttpInterceptorFn } from '@angular/common/http'
import { LoaderService } from '../services/loader.service'
import { delay, finalize } from 'rxjs'
import { inject } from '@angular/core'

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  loaderService.showLoader()
  console.log('request intercepted')
  let cloneRequest = req.clone({
    setHeaders: { pipo: 'pipo!' },
  })
  return next(cloneRequest).pipe(
    delay(5000),
    finalize(() => loaderService.hideLoader())
  )
}
