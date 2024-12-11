import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper'
import { CodeHighlightComponent } from '../../../../../code-highlight/code-highlight.component'
import { TagModule } from 'primeng/tag'
import { CardModule } from 'primeng/card'
import { DividerModule } from 'primeng/divider'

@Component({
  selector: 'app-cookies-in-real-life',
  standalone: true,
  imports: [
    StepperModule,
    CodeHighlightComponent,
    TagModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './cookies-in-real-life.component.html',
  styleUrl: './cookies-in-real-life.component.scss'
})
export class CookiesInRealLifeComponent {
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
      # domain: ".railsgenius.com",
      path: '/', # available in all paths
      same_site: :strict,
      expires: 5.minute.from_now, # expiration 5 minutes
      secure: Rails.env.development?,
      httponly: false # JS can read the cookie
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
