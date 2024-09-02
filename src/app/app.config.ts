import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'
import { JwtModule } from '@auth0/angular-jwt'
import { provideQuillConfig } from 'ngx-quill'

export function tokenGetter() {
  return '69*'
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      BrowserAnimationsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:3000'],
          disallowedRoutes: ['http://example.com/examplebadroute/'],
        },
      })
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideQuillConfig({
      modules: {
        syntax: false,
        toolbar: [
          [{ font: [] }, { size: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['direction', { align: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
    }),
  ],
}
