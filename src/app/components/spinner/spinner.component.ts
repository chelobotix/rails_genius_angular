import { Component, inject, OnInit } from '@angular/core'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { LoaderService } from '../../services/loader.service'
import { AsyncPipe } from '@angular/common'
import { ProgressBarModule } from 'primeng/progressbar'
import { CardModule } from 'primeng/card'
import { MenuService } from '../../services/menu.service'

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule, AsyncPipe, ProgressBarModule, CardModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
  loaderService = inject(LoaderService)
  menuService = inject(MenuService)

  ngOnInit(): void {}
}
