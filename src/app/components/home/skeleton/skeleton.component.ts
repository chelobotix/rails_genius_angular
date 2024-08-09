import { Component } from '@angular/core'
import { SkeletonModule } from 'primeng/skeleton'

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {}
