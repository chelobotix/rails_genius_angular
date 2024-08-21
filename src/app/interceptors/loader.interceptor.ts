import {HttpInterceptorFn} from '@angular/common/http'
import {LoaderService} from '../services/loader.service'
import {delay, finalize} from 'rxjs'
import {inject} from '@angular/core'

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('intercepted')
  let cloneRequest = req.clone({
    setHeaders: {pipo: 'pipo!'},
  })
  return next(cloneRequest)
}
