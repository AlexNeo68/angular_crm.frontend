import { Component } from '@angular/core';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent {
  constructor(public preloaderService: PreloaderService) {}
}
