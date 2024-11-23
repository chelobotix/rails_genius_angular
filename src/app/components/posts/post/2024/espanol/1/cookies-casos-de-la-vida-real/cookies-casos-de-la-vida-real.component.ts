import { Component } from '@angular/core'
import { CodeHighlightComponent } from '../../../../../../code-highlight/code-highlight.component'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { DividerModule } from 'primeng/divider'
import { StepperModule } from 'primeng/stepper'

@Component({
  selector: 'app-cookies-casos-de-la-vida-real',
  standalone: true,
  imports: [CodeHighlightComponent, CardModule, TagModule, DividerModule, StepperModule],
  templateUrl: './cookies-casos-de-la-vida-real.component.html',
  styleUrl: './cookies-casos-de-la-vida-real.component.scss',
})
export class CookiesCasosDeLaVidaRealComponent {
  code_array = [
    `before_action :set_cookie

def set_cookie
   cookies["mi_first_cookie"] =
   {
      value: 'Learning cookies with Rails Genius'
   }
end`,
    `cookies['my_cookie'] = {
      value: { theme: ‘dark’, language: ‘spanish’ },
      domain: :all,
      tdl_length: 2,
      path: '/',
      same_site: :strict,
      expires: 1.hour.from_now,
      secure: true,
      httponly: false
      }`,
    `secure: Rails.env.production?`,
    `rails generate controller HandleCookies set_cookie get_cookie`,
    `class HandleCookiesController < ApplicationController
  def set_cookie
    cookies['my_ex_toxic_girlfriend'] = {
      value: { name: 'Tifany', age: 18, hobby: 'make problems' },
      # domain: ".railsgenius.com", #ya vimos esta parte, en este caso no lo aplicaremos
      path: '/', # la cookie estara disponible para todos los paths
      same_site: :strict, # solo enviara la cookie al dominio que la creo
      expires: 5.minute.from_now, # expirara en 5 minutos
      secure: Rails.env.development?, # como estamos en local devolvera false y aceptara http
      httponly: false # esto es para que JS pueda leer la cookie
    }
  end

  def get_cookie; end
end `,
    `def get_cookie
  @cookie_value = cookies['my_ex_toxic_girlfriend']
end`,
    `<p><%= @cookie_value['name'] %></p>
<p><%= @cookie_value['age'] %></p>
<p><%= @cookie_value['hobby']`,
    `cookies.signed[:user_id] = 10`,
    `_cookies.signed[:user_id]`,
    `cookies.encrypted[:discount] = 30`,
    `cookies.permanent[:login] = "XJ-122"`,
    `cookies.signed.permanent[:login] = "XJ-122`,
  ]
}
