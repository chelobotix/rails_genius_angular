
import { Button } from 'primeng/button'
import {Component, inject, OnInit} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {PrimeNGConfig} from "primeng/api";
import {ThemeService} from "../themes/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private primengConfig = inject(PrimeNGConfig)
  private themeService = inject(ThemeService)

  ngOnInit(): void {
    this.primengConfig.ripple = true
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme()
  }
}
