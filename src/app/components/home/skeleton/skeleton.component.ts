import { Component, inject, OnInit } from '@angular/core'
import { SkeletonModule } from 'primeng/skeleton'
import { LoaderService } from '../../../services/loader.service'

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {}
