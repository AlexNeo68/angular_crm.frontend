import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input('navigation') navigationProps: Navigation[];
  @Output() sidenavToggle = new EventEmitter();

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
  }
}
